package com.ssafy.realcart.game;

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
        if(port == 8886){
            flag.setPlayer1Status(1);
            System.out.println(flag);
        } else if (port == 8887){
            flag.setPlayer2Status(1);
            System.out.println(flag);
        } else {
            System.out.println("Invalidate port is opened");
        }
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        System.out.println(conn.getLocalSocketAddress() + " closed connection.");
        System.out.println("code: " + code + ", Reason: " + reason);
        if(port == 8886){
            // 게임 시작 전에 한명이 나가면
            if(flag.getPlayer1Status() == 1){
                if(flag.getPlayer1Status() == 0 || flag.getPlayer2Status() == 0){
                    flag.sendNewGameToBackend();
                }
            // 게임 중에 나가면
            } else if(flag.getPlayer1Status() == 2){
                // 2
                Long endTime = 0L;
                Long labTime = endTime - flag.getStartTime();
                // 3
                String bodySeg = "";
                bodySeg = flag.getPlayer1Nickname() + "," + Long.toString(labTime);
                if (flag.getRequestBody() == "") {
                    flag.setRequestBody(flag.getRequestBody() + bodySeg);
                } else {
                    flag.setRequestBody(flag.getRequestBody() + "," + bodySeg);
                    flag.sendResultToBackend(flag.getRequestBody());
                }
                flag.setPlayer1Status(0);
                if(flag.getPlayer1Status() == 0 && flag.getPlayer2Status() == 0){
                    flag.initiateAll();
                }
            }
            flag.setPlayer1Status(0);
            System.out.println("websocket closed on " + port + " >>> " + flag);
        } else if (port == 8887){
            // 게임 시작 전에 한명이 나가면
            if(flag.getPlayer2Status() == 1){
                if(flag.getPlayer1Status() == 0 || flag.getPlayer2Status() == 0){
                    flag.sendNewGameToBackend();
                }
                // 게임 중에 나가면
            } else if(flag.getPlayer2Status() == 2){
                // 2
                Long endTime = 0L;
                Long labTime = endTime - flag.getStartTime();
                // 3
                String bodySeg = "";
                bodySeg = flag.getPlayer2Nickname() + "," + Long.toString(labTime);
                if (flag.getRequestBody() == "") {
                    flag.setRequestBody(flag.getRequestBody() + bodySeg);
                } else {
                    flag.setRequestBody(flag.getRequestBody() + "," + bodySeg);
                    flag.sendResultToBackend(flag.getRequestBody());
                }
                flag.setPlayer2Status(0);
                if(flag.getPlayer1Status() == 0 && flag.getPlayer2Status() == 0){
                    flag.initiateAll();
                }
            }
            flag.setPlayer2Status(0);
            System.out.println("websocket closed on " + port + " >>> " + flag);
        } else {
            System.out.println("Invalidate port is closed");
        }
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        if(flag.getGameStatus() == 1){
            if(message.length() <= 2) {
                pw.write(Integer.parseInt(message));
                pw.flush();
            }
        } else {
            if(message.length() >= 3){
                if(port == 8886){
                    flag.setPlayer1Nickname(message);
                    System.out.println("flag.setPlayer1Nickname " + message);
                    System.out.println(flag);
                } else if(port == 8887){
                    flag.setPlayer2Nickname(message);
                    System.out.println("flag.setPlayer2Nickname " + message);
                    System.out.println(flag);
                }
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
        System.out.println("WebSocket server started on port " + this.port);
    }
}
