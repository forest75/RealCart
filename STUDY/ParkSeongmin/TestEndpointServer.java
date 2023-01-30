import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.server.ServerEndpoint;

/**
 * Websocket Test Server
 */
@ServerEndpoint("/websocket")
public class TestEndpointServer {

    /**
     * 웹 소켓이 연결되었을 때 호출(또는 URL 접근시 호출)
     */
    @OnOpen
    public void connectionOpen() {
        System.out.println("################# client is connected!");
    }

    /**
     * 웹 소켓에서 메시지가 날라왔을 때 호출
     * cf) 메세지를 받기만 할 경우 return 값을 void로 설정
     */
    @OnMessage
    public String receiveMessage(String message) {
        System.out.println("################# Message from the client : " + message);
        String sendMessage = "return message " + message + " -> Lucky Number : " + Math.floor(Math.random() * 100);
        System.out.println("################# Echo from the server : " + sendMessage);
        return sendMessage;
    }

    /**
     * 웹 소켓이 닫혔을 때 호출(또는 브라우저가 닫혔을 때 호출)
     */
    @OnClose
    public void connectionClose() {
        System.out.println("################# client is disconnected!");
    }

    /**
     * 웹 소켓이 에러가 났을 때 호출
     * @param t
     */
    @OnError
    public void connectionError(Throwable t) {
        t.printStackTrace();
    }
}