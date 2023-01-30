import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.WebSocket;
import java.net.http.WebSocket.Listener;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.java_websocket.WebSocket;
import org.java_websocket.WebSocketImpl;
import org.java_websocket.server.WebSocketServer;


public class JavaServer {

    public static void main(String[] args) throws URISyntaxException {
        JavaServer javaServer = new JavaServer();
        javaServer.start();
    }

    public void start(){
        ServerSocket serverSocket = null;
        Socket socket = null;
        int rcNum = 0;
        try {
            // binding server socket
            serverSocket = new ServerSocket(8080);

            // Initialize WebSocket server
            int wsPort = 8081;
            WebSocketServer wsServer = new org.example.WSHandler(wsPort);
            wsServer.start();
            System.out.println("WebSocket server started on port " + wsPort);

            while (true) {
                System.out.println("waiting for raspberry pi..." + Integer.toString(rcNum));
                // bind raspberry socket server
                socket = serverSocket.accept();
                rcNum++;
                // Create Thread when client(Frontend react server) accepted !
                PassingThread passingThread = new PassingThread(socket);
                passingThread.start();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (serverSocket != null){
                try{
                    serverSocket.close();
                    System.out.println("Server is turn downed.");
                } catch (IOException e){
                    e.printStackTrace();;
                    System.out.println("Server socket error");
                }
            }
        }
    }
}

class PassingThread extends Thread{
    // PrintWriter는 object를 text-output으로 출력한다.
    // synchronizedList는 병렬 스레드 환경에서 동기화된 처리를 하기 위해
    static List<PrintWriter> list = Collections.synchronizedList(new ArrayList<PrintWriter>());

    Socket socket = null;
    BufferedReader br = null;
    PrintWriter pw = null;

    public PassingThread (Socket socket) {
        this.socket = socket;
        try {
            System.out.println(socket);
            pw = new PrintWriter(socket.getOutputStream());
            br = new BufferedReader(new InputStreamReader(socket.getInputStream(), StandardCharsets.US_ASCII), 64);
            list.add(pw);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run(){
        try {
            int flag = br.read();
            System.out.println(flag);
            if( flag == 50) {
                fnForRasp();
            } else {
                fnForFront();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            System.out.println("run이 종료되었습니다.");
        }
    }

    private void fnForRasp() throws IOException {
        while(br != null) {
            String imageLenStr = "";
            for(int i=0; i<64; i++){
                imageLenStr += (char) br.read();
            }
            int imageLen = Integer.parseInt(imageLenStr.trim());
            String decImage = "";
            for(int i=0; i<imageLen; i++){
                decImage += (char) br.read();
            }
            System.out.println(decImage);
        }
    }

    private void fnForFront() throws IOException {
        while(br != null) {
            String imageLenStr = "";
            for(int i=0; i<256; i++){
                int read = br.read();
                if(read >= 0){
                    imageLenStr += (char) br.read();
                }
            }
            if (!imageLenStr.equals("")){
                System.out.println(imageLenStr);
            }
            String decImage = "";
        }
    }

    private void sendAll (String s) {
        for (PrintWriter out : list) {
            System.out.println("sendAll");
            out.println(s);
            out.flush();
        }
    }
}

class SocketHandler implements Runnable {
    private Socket socket;
    public SocketHandler(Socket socket) {
        this.socket = socket;
    }
    public void run() {

    }
}

class WSHandler extends WebSocketServer {
    public WSHandler(int port) {
        super(new java.net.InetSocketAddress(port));
    }
    @Override
    public void onOpen(WebSocket conn, org.java_websocket.handshake.ClientHandshake handshake) {
        System.out.println("on Open");
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {

    }

    @Override
    public void onMessage(WebSocket conn, String message) {

    }

    @Override
    public void onError(WebSocket conn, Exception ex) {

    }

    @Override
    public void onStart() {

    }
    // other WebSocket methods (onClose, onMessage, onError)
}