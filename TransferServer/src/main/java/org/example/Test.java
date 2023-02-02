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
import java.nio.charset.StandardCharsets;
import java.util.List;

public class Test {
    static List<WebSocket> waitingQueue = null;
    public static void main(String[] args) {
        Thread thread1 = new Thread(new RCcarThread325(8081, 8887));
        thread1.start();
    }

}

class RCcarThread325 implements Runnable{

    ServerSocket serverSocket = null;
    Socket socket = null;
    BufferedReader br = null;
    PrintWriter pw = null;
    WebSocketServer webSocketServer = null;

    RCcarThread325(int socketPort, int webSocketPort){
        webSocketServer = new WsHandler325(webSocketPort);
        webSocketServer.start();
        System.out.println("websocket server started on port " + webSocketPort);
    }

    @Override
    public void run() {
        System.out.println("thread started to run");
    }
}

class WsHandler325 extends WebSocketServer{

    int port = 0;

    public WsHandler325(int port){
        super(new java.net.InetSocketAddress(port));
        this.port = port;
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        System.out.println(conn.getLocalSocketAddress() + " closed connection.");
        System.out.println("code: " + code + "Reason: " + reason);
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        System.out.println("onmessage");
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
