package org.example;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class GameServer {
    static List<WebSocket> waitingQueue = null;
    public static void main(String[] args) {
        Thread thread1 = new Thread(new RCcarThread(8081, 8887));
        thread1.start();
    }

}

class RCcarThread implements Runnable{

    ServerSocket serverSocket = null;
    Socket socket = null;
    BufferedReader br = null;
    PrintWriter pw = null;
    WebSocketServer webSocketServer = null;

    RCcarThread(int socketPort, int webSocketPort){
        try {
            serverSocket = new ServerSocket(socketPort);
            System.out.println("server socket started on port " + socketPort);
            socket = serverSocket.accept();
            System.out.println("server socket accepted " + socket.getLocalSocketAddress());
            pw = new PrintWriter(socket.getOutputStream());
            br = new BufferedReader(new InputStreamReader(socket.getInputStream(), StandardCharsets.US_ASCII), 64);
            System.out.println("socket I/O streams are created.");
            String domain = "i8a403.p.ssafy.io";
            InetSocketAddress address = new InetSocketAddress(new InetSocketAddress(domain, webSocketPort));
            webSocketServer = new WsHandler(webSocketPort, pw);
            webSocketServer.start();
            System.out.println("websocket server started on port " + webSocketPort);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        System.out.println("thread started to run");
        try{
            while(br != null){
                String imageLenStr = "";
                for(int i=0; i<128; i++){
                    imageLenStr += (char) br.read();
                }
                int imageLen = Integer.parseInt(imageLenStr.trim());
                String decImage = "";
                for(int i=0; i<imageLen; i++) {
                    decImage += (char) br.read();
                }
                System.out.println(decImage);
            }
        } catch (IOException e){
            socket = null;
            System.out.println("Error on running thread");
            e.printStackTrace();
        }
    }
}

class WsHandler extends WebSocketServer{

    PrintWriter pw = null;
    int port = 0;

    public WsHandler(InetSocketAddress inetSocketAddress, PrintWriter pw){
        super(inetSocketAddress);
        this.port = port;
        this.pw = pw;
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        System.out.println(conn.getLocalSocketAddress() + " is on open.");
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        System.out.println(conn.getLocalSocketAddress() + " closed connection.");
        System.out.println("code: " + code + "Reason: " + reason);
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        pw.write(Integer.parseInt(message));
        pw.flush();
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        System.out.println("WebSocket on error.");
        ex.printStackTrace();
    }

    @Override
    public void onStart() {
        System.out.println("WebSocket server started on port" + this.port);
    }
}
