package org.example;


import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;


public class JavaServer {
    int numOfThread = 0;

    public static void main(String[] args) throws URISyntaxException {
        JavaServer javaServer = new JavaServer();
        javaServer.start();
    }

    public void start(){
        ServerSocket serverSocket = null;
        Socket socket = null;
        try {
            // Initialize WebSocket server
            int wsPort = 8081;
            WebSocketServer wsServer = new org.example.WSHandler(wsPort);
            wsServer.start();
            System.out.println("WebSocket server started on port " + wsPort);

            // binding server socket
            int ssPort = 8080;
            serverSocket = new ServerSocket(ssPort);

            while (true) {
                System.out.println("waiting for raspberry pi..." + Integer.toString(numOfThread));
                // bind raspberry socket server
                socket = serverSocket.accept();
                numOfThread++;
                // Create Thread when client(Frontend react server) accepted
                PassingThread passingThread = new PassingThread(socket, wsServer);
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
    WebSocketServer wsServer = null;
    Collection<WebSocket> webSocket = null;

    public PassingThread (Socket socket, WebSocketServer wsServer) {
        this.socket = socket;
        this.wsServer = wsServer;
        this.webSocket = wsServer.getConnections();
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
            if( flag == 50) {
                fnForRasp();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            System.out.println("Thread ended");
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
            for(WebSocket client : webSocket){
                client.send(decImage);
            }
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
/*
class SocketHandler implements Runnable {
    static List<PrintWriter> list = Collections.synchronizedList(new ArrayList<PrintWriter>());
    Socket socket = null;
    BufferedReader br = null;
    PrintWriter pw = null;
    public SocketHandler(Socket socket) {
        this.socket = socket;
        try {
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
            if( flag == 50) {
                fnForRasp();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            System.out.println("Thread ended");
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
}
*/

class WSHandler extends WebSocketServer {
    public WSHandler(int port) {
        super(new java.net.InetSocketAddress(port));
    }

    @Override
    public void onOpen(org.java_websocket.WebSocket conn, ClientHandshake handshake) {
        System.out.println("onOpen");
    }

    @Override
    public void onClose(org.java_websocket.WebSocket conn, int code, String reason, boolean remote) {
        System.out.println("onClose");
    }

    @Override
    public void onMessage(org.java_websocket.WebSocket conn, String message) {
        System.out.println(message);
    }

    @Override
    public void onError(org.java_websocket.WebSocket conn, Exception ex) {
        System.out.println("onError");
    }

    @Override
    public void onStart() {
        System.out.println("onStart");
    }
    // other WebSocket methods (onClose, onMessage, onError)
}