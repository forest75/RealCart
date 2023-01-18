import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class JavaServer {

    public static void main(String[] args) {
        JavaServer javaServer = new JavaServer();
        javaServer.start();
    }

    public void start(){
        ServerSocket serverSocket = null;
        Socket socket = null;
        try {
            serverSocket = new ServerSocket(8080);
            while (true) {
                System.out.println("waiting for client...");
                socket = serverSocket.accept();

                // 클라이언트가 접속할 때마다 새로운 스레드 생성
                ReceiveThread receiveThread = new ReceiveThread(socket);
                receiveThread.start();
            }
        } catch (IOException e) {
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

class ReceiveThread extends Thread{
    // PrintWriter는 object를 text-output으로 출력한다.
    // synchronizedList는 병렬 스레드 환경에서 동기화된 처리를 하기 위해
    static List<PrintWriter> list = Collections.synchronizedList(new ArrayList<PrintWriter>());

    Socket socket = null;
    BufferedReader br = null;
    PrintWriter pw = null;

    public ReceiveThread (Socket socket) {
        this.socket = socket;
        try {
            pw = new PrintWriter(socket.getOutputStream());
            br = new BufferedReader(new InputStreamReader(socket.getInputStream(), "ASCII"), 64);
            list.add(pw);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run(){
        System.out.println("run");
        try {
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
            System.out.println(br != null);
            System.out.println("brbr");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            System.out.println("run이 종료되었습니다.");
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
