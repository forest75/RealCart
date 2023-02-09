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
        System.out.println("code: " + code + "Reason: " + reason);
        if(port == 8886){
            flag.setPlayer1Status(0);
            System.out.println("websocket closed on " + port + " >>> " + flag);
        } else if (port == 8887){
            flag.setPlayer2Status(0);
            System.out.println("websocket closed on " + port + " >>> " + flag);
        } else {
            System.out.println("Invalidate port is closed");
        }
        // 중도탈퇴같은 경우는, timestamp를 0으로 만들어 finish 신호를 보냈을 때 함수를 실행
        if(flag.getGameStatus() == 0){
            if(flag.getPlayer1Status() == 0 || flag.getPlayer2Status() == 0){
                flag.sendNewGameToBackend();
            }
        } else if(flag.getGameStatus() == 1){
            // 2
            Long endTime = 0L;
            Long labTime = endTime - flag.getStartTime();
            // 3
            String bodySeg = "";
            if (port == 8886) {
                bodySeg = flag.getPlayer1Nickname() + "," + Long.toString(labTime);
            } else if (port == 8887) {
                bodySeg = flag.getPlayer2Nickname() + "," + Long.toString(labTime);
            }
            if (flag.getRequestBody() == "") {
                flag.setRequestBody(flag.getRequestBody() + bodySeg);
            } else {
                flag.setRequestBody(flag.getRequestBody() + "," + bodySeg);
                flag.sendResultToBackend(flag.getRequestBody());
            }
            if(flag.getPlayer1Status() == 0 && flag.getPlayer2Status() == 0){
                flag.initiateAll();
            }
        }
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        if(flag.getGameStatus() == 1){
            pw.write(Integer.parseInt(message));
            pw.flush();
        } else {
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

    @Override
    public void onError(WebSocket conn, Exception ex) {
        System.out.println("WebSocket on error.");
        ex.printStackTrace();
    }

    @Override
    public void onStart() {
        System.out.println("WebSocket server started on port" + this.port);
        System.out.println(flag);
    }
}
