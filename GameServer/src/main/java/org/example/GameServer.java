package org.example;

import com.google.gson.Gson;
import org.java_websocket.WebSocket;
import org.java_websocket.server.WebSocketServer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class GameServer {

    public static void main(String[] args) {
        FlagClass flag = new FlagClass();
        Thread thread1 = new Thread(new RCcarThread(8081, 8887, flag));
        thread1.start();
        Thread thread2 = new Thread(new RCcarThread(8082, 8888, flag));
        thread2.start();
    }

}

class RCcarThread implements Runnable{

    ServerSocket serverSocket = null;
    Socket socket = null;
    BufferedReader br = null;
    PrintWriter pw = null;
    WebSocketServer webSocketServer = null;;
    FlagClass flag = null;
    Gson gson = new Gson();

    RCcarThread(int socketPort, int webSocketPort, FlagClass flag){
        try {
            this.flag = flag;
            serverSocket = new ServerSocket(socketPort);
            System.out.println("server socket started on port " + socketPort);
            socket = serverSocket.accept();
            System.out.println("server socket accepted " + socket.getLocalSocketAddress());
            pw = new PrintWriter(socket.getOutputStream());
            br = new BufferedReader(new InputStreamReader(socket.getInputStream(), StandardCharsets.US_ASCII), 64);
            System.out.println("socket I/O streams are created.");
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
                String dataLenStr = "";
                for(int i=0; i<128; i++){
                    dataLenStr += (char) br.read();
                }
                int imageLen = Integer.parseInt(dataLenStr.trim());
                String jsonData = "";
                for(int i=0; i<imageLen; i++) {
                    jsonData += (char) br.read();
                }
                RcCarStatus rcCarStatus = gson.fromJson(jsonData, RcCarStatus.class);
                switch(rcCarStatus.status){
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                }


            }
        } catch (IOException e){
            socket = null;
            System.out.println("Error on running thread");
            e.printStackTrace();
        }
    }
}
