package com.ssafy.realcart.game;

import com.google.gson.Gson;
import org.java_websocket.WebSocket;
import org.java_websocket.server.WebSocketServer;
import org.slf4j.ILoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.sql.SQLOutput;

public class GameServer {

    public static void main(String[] args) {
        FlagClass flag = FlagClass.getInstance();
        Thread thread1 = new Thread(new RCcarThread(8081, 8886, flag));
        thread1.start();
        Thread thread2 = new Thread(new RCcarThread(8082, 8887, flag));
        thread2.start();
    }

}

class RCcarThread implements Runnable{

    ServerSocket serverSocket = null;
    Socket socket = null;
    BufferedReader br = null;
    PrintWriter pw = null;
    WebSocketServer webSocketServer = null;
    FlagClass flag = null;
    Gson gson = new Gson();
    Logger LOGGER = LoggerFactory.getLogger(RCcarThread.class);

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
            LOGGER.error("Connection error raised. ", e);
        }
    }

    @Override
    public void run() {
        System.out.println("thread started to run");
        try{
            while(br != null) {
                int dataLen = 100;
                String jsonData = "";
                for (int i = 0; i < dataLen; i++) {
                    jsonData += (char) br.read();
                }
                try{
                    // jsonData가 자꾸 공백으로 넘어오기 때문에 try catch 해줘야 함
                    RcCarStatusDto rcCarStatus = gson.fromJson(jsonData.trim(), RcCarStatusDto.class);
                    System.out.println(rcCarStatus);
                    // 0: NULL, 1: Ready, 2: Finish, 3: Running
                    switch (rcCarStatus.status) {
                    /*
                    1일 때...(Ready)
                    0. RC카의 준비 신호를 받고, 두 대가 준비 완료되었다면 newgame 신호를 백엔드에 보낸다.
                    1. 만일 모두 준비가 완료되었다면 flag.gamestatus를 1로 만든다.
                    2. Frontend 서버에 5초 뒤 게임을 시작한다는 신호(1)를 wss를 통해 보낸다.
                    3. Thread.sleep(5000)으로 5초 쉬고 RC카에 start 신호를 보낸다.
                    4. 스타트 타임을 flag에 기록하고 gameStatus를 1으로 바꾼다.
                     */
                        case 1:
                            // 0
                            if(rcCarStatus.carNum == 1){
                                flag.setCar1Status(1);
                                if(flag.getCar2Status() == 1){
                                    flag.sendNewGameToBackend();
                                }
                            }else if(rcCarStatus.carNum == 2){
                                flag.setCar2Status(1);
                                if(flag.getCar1Status() == 1){
                                    flag.sendNewGameToBackend();
                                }
                            }
                            System.out.println("RC cars Ready >>> " + flag);
                            // 1
                            while (true) {
                                if (flag.getCar1Status() == 1 &&
                                        flag.getCar2Status() == 1 &&
                                        flag.getPlayer1Status() == 1 &&
                                        flag.getPlayer2Status() == 1) {
                                    System.out.println("We All Ready >>> " + flag);
                                    break;
                                }
                                Thread.sleep(2000);
                            }
                            // 2
                            for (WebSocket client : webSocketServer.getConnections()) {
                                client.send("{\"status\":1}");
                            }
                            // 3
                            Thread.sleep(5000);
                            ///////////// Game Start ////////////////
                            pw.write((byte) '1');
                            pw.flush();
                            // 4
                            flag.setStartTime(System.currentTimeMillis());
                            flag.setPlayer1Status(2);
                            flag.setPlayer2Status(2);
                            flag.setGameStatus(1);
                            System.out.println("Game Start >>> " + flag);
                            break;
                    /*
                    2일 때..(Finish)
                    1. 랩타임을 계산한다.
                    2. 랭킹 기록을 위해 클라이언트에게 labTime을 넘긴다.
                    3. 백엔드로 문자를 넘기기 위해 bodyseq을 만든다.
                    4. bodyseq를 조합하여 백엔드로 전송하고 setGameStatus(0)을 실행
                    5. initiateAll()로 모두 초기화한다.
                     */
                        case 2:
                            // 1
                            Long endTime = rcCarStatus.timestamp;
                            Long labTime = endTime - flag.getStartTime();
                            // 2
                            for (WebSocket client : webSocketServer.getConnections()) {
                                client.send("{\"status\":2, \"labtime\":"+labTime+"}");
                                if(rcCarStatus.carNum == 1){
                                    flag.setPlayer1Status(0);
                                } else if(rcCarStatus.carNum == 2){
                                    flag.setPlayer2Status(0);
                                }
                                System.out.println(flag);
                                ////////////////WebSocket Closed/////////////////
                                client.close();
                            }
                            // 3
                            String bodySeg = "";
                            if (rcCarStatus.carNum == 1) {
                                bodySeg = flag.getPlayer1Nickname() + "," + Long.toString(labTime);
                                flag.setPlayer1Laptime(labTime);
                            } else if (rcCarStatus.carNum == 2) {
                                bodySeg = flag.getPlayer2Nickname() + "," + Long.toString(labTime);
                                flag.setPlayer2Laptime(labTime);
                            }
                            // 4
                            if (flag.getRequestBody() == "") {
                                flag.setRequestBody(flag.getRequestBody() + bodySeg);
                            } else {
                                flag.setRequestBody(flag.getRequestBody() + "," + bodySeg);
                                flag.sendResultToBackend(flag.getRequestBody());
                                flag.setGameStatus(0);
                            }
                            // 5
                            if(flag.getPlayer1Status() == 0 && flag.getPlayer2Status() == 0){
                                flag.initiateAll();
                            }
                            break;
                        // 주행 중에는 주행 정보를 클라이언트에게 보내준다.
                        case 3:
                            for(WebSocket client : webSocketServer.getConnections()){
                                client.send(jsonData);
                            }
                            break;
                    }
                }catch (Exception e){
//                    e.printStackTrace();
                }
            }
        } catch (IOException e){
            socket = null;
            System.out.println("Error on running thread");
            e.printStackTrace();
        }
    }
}
