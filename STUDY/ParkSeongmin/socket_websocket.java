import org.java_websocket.WebSocket;
import org.java_websocket.WebSocketImpl;
import org.java_websocket.server.WebSocketServer;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MultiProtocolServer {
    public static void main(String[] args) {
        // Initialize socket server
        ExecutorService socketThreadPool = Executors.newFixedThreadPool(10);
        try (ServerSocket socketServer = new ServerSocket(9999)) {
            System.out.println("Socket server started on port 9999");
            while (true) {
                // Accept incoming socket connections
                Socket socket = socketServer.accept();
                socketThreadPool.execute(new SocketHandler(socket));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Initialize WebSocket server
        WebSocketImpl.DEBUG = true;
        int wsPort = 8888;
        WebSocketServer wsServer = new WSHandler(wsPort);
        wsServer.start();
        System.out.println("WebSocket server started on port " + wsPort);
    }
}

class SocketHandler implements Runnable {
    private Socket socket;
    public SocketHandler(Socket socket) {
        this.socket = socket;
    }
    public void run() {
        // Handle socket connection
        // ...
    }
}

class WSHandler extends WebSocketServer {
    public WSHandler(int port) {
        super(new java.net.InetSocketAddress(port));
    }
    @Override
    public void onOpen(WebSocket conn, org.java_websocket.handshake.ClientHandshake handshake) {
        // Handle WebSocket connection
        // ...
    }
    // other WebSocket methods (onClose, onMessage, onError)
}
