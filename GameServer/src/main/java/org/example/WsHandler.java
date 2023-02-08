package org.example;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.io.PrintWriter;
import java.net.InetSocketAddress;

class WsHandler extends WebSocketServer {

    PrintWriter pw = null;
    int port = 0;
    FlagClass flag = FlagClass.getInstance();

    public WsHandler(int port, PrintWriter pw){
        super(new InetSocketAddress(port));
        this.port = port;
        this.pw = pw;
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        System.out.println(conn.getLocalSocketAddress() + " is on open.");
        if(port == 8887){
            flag.setPlayer1Status(1);
        } else if (port == 8888){
            flag.setPlayer2Status(1);
        } else {
            System.out.println("Invalidate port is opened");
        }
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        System.out.println(conn.getLocalSocketAddress() + " closed connection.");
        System.out.println("code: " + code + "Reason: " + reason);
        if(port == 8887){
            flag.setPlayer1Status(0);
        } else if (port == 8888){
            flag.setPlayer2Status(0);
        } else {
            System.out.println("Invalidate port is closed");
        }
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        if(flag.getGameStatus() == 3){
            pw.write(Integer.parseInt(message));
            pw.flush();
        } else {
            if(port == 8887){
                flag.setPlayer1Nickname(message);
            } else if(port == 8888){
                flag.setPlayer2Nickname(message);
            }
        }
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
