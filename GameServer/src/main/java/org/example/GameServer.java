package org.example;

import com.google.gson.Gson;
import org.java_websocket.WebSocket;
import org.java_websocket.server.WebSocketServer;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class GameServer {

    public static void main(String[] args) {
        FlagClass flag = FlagClass.getInstance();
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
    WebSocketServer webSocketServer = null;
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
            while(br != null) {
                String dataLenStr = "";
                for (int i = 0; i < 128; i++) {
                    dataLenStr += (char) br.read();
                }
                int imageLen = Integer.parseInt(dataLenStr.trim());
                String jsonData = "";
                for (int i = 0; i < imageLen; i++) {
                    jsonData += (char) br.read();
                }
                RcCarStatusDto rcCarStatus = gson.fromJson(jsonData, RcCarStatusDto.class);
                // 0: NULL, 1: Ready, 2: Finish, 3: Running
                switch (rcCarStatus.status) {
                    /*
                    1일 때...
                    1. Flag 상에 Player1과 Player2의 웹소켓 연결 여부를 물어본다.
                    2. 만일 모두 준비가 완료되었다면 flag.gamestatus를 1로 만든다.
                    3. Frontend 서버에 5초 뒤 게임을 시작한다는 신호(1)를 wss를 통해 보낸다.
                    4. 3번 직후 Thread.sleep(5000)으로 5초 쉰다.
                    5. 스타트 타임을 flag에 기록하고 gameStatus를 3으로 바꾼다.
                     */
                    case 1:
                        while (true) {
                            if (flag.getPlayer1Status() == 1 && flag.getPlayer2Status() == 1) {
                                break;
                            }
                            Thread.sleep(2000);
                        }

                        flag.setGameStatus(1);
                        for (WebSocket client : webSocketServer.getConnections()) {
                            client.send("1");
                        }
                        Thread.sleep(5000);
                        pw.write((byte) '1');
                        pw.flush();
                        flag.setStartTime(System.currentTimeMillis());
                        flag.setGameStatus(3);
                    /*
                    2일 때..
                    1-1. 게임끝 신호 "2" 를 프론트에게 보낸다.
                    1-2. 웹소켓 연결을 끊는다.
                    2. 기록을 위해 timestamp를 받는다.
                    3. 백엔드로 랩타임을 넘긴다.
                    4. gameState를 1로 만든다.
                    5. initiateAll() 함수를 실행한다.

                     */
                    case 2:
                        // 1
                        for (WebSocket client : webSocketServer.getConnections()) {
                            client.send("2");
                            client.close();
                        }
                        // 2
                        Long endTime = rcCarStatus.timestamp;
                        Long labTime = flag.getStartTime() - endTime;
                        // 3
                        String bodySeg = "";
                        if (rcCarStatus.carNum == 1) {
                            bodySeg = flag.getPlayer1Nickname() + ", " + Long.toString(labTime);
                            flag.setPlayer1Status(2);
                        } else if (rcCarStatus.carNum == 2) {
                            bodySeg = flag.getPlayer2Nickname() + Long.toString(labTime);
                            flag.setPlayer2Status(2);
                        }
                        if (flag.getRequestBody() == "") {
                            flag.setRequestBody(flag.getRequestBody() + bodySeg);
                        } else {
                            flag.setRequestBody(", "+ flag.getRequestBody() + bodySeg);
                            flag.requestToBackend(flag.getRequestBody());
                            flag.setRequestBody("");
                        }
                        // 4
                        flag.setGameStatus(1);
                        // 5
                        if(flag.getPlayer1Status() == 2 && flag.getPlayer1Status() == 2){
                            flag.initiateAll();
                        }
                }
            }
        } catch (IOException | InterruptedException e){
            socket = null;
            System.out.println("Error on running thread");
            e.printStackTrace();
        }
    }
}
