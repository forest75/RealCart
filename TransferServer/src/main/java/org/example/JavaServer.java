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
            // binding server socket
            int ssPort = 8080;
            serverSocket = new ServerSocket(ssPort);

            while (true) {
                System.out.println("waiting for raspberry pi..." + Integer.toString(numOfThread));
                // bind raspberry socket server
                socket = serverSocket.accept();
                numOfThread++;
                // Initialize WebSocket server
                int wsPort = 443;
                WebSocketServer wsServer = new org.example.WSHandler(wsPort, new PrintWriter(socket.getOutputStream()));
                wsServer.start();
                System.out.println("WebSocket server started on port " + wsPort);
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
            for(WebSocket client : wsServer.getConnections()){
                client.send(decImage);
            }
        }
    }
}

class WSHandler extends WebSocketServer {
    PrintWriter pw = null;
    public WSHandler(int port, PrintWriter printWriter) {
        super(new java.net.InetSocketAddress(port));
        this.pw = printWriter;
    }

    @Override
    public void onOpen(org.java_websocket.WebSocket conn, ClientHandshake handshake) {
    }

    @Override
    public void onClose(org.java_websocket.WebSocket conn, int code, String reason, boolean remote) {
        System.out.println("onClose");
    }

    @Override
    public void onMessage(org.java_websocket.WebSocket conn, String message) {
        pw.write(Integer.parseInt(message));
        pw.flush();
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
