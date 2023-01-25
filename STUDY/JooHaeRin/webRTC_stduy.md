[[개발] WebRTC & SpringBoot & Vue.js를 활용한 Group Video Call 1 : 이론 (velog.io)](https://velog.io/@jsb100800/%EA%B0%9C%EB%B0%9C-WebRTC-SpringBoot-Vue.js%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-Group-Video-Call)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4fe939ad-15a5-4090-8e0a-d555f93a928a/Untitled.png)

별도의 플러그인 설치 없이 실시간으로 미디어를 최대한 서버를 거치지 않고 Peer간 전송할 수 있는 오픈소스 기반 기술

각 peer들 끼리 연결하려면

1. signaling 이 우선 되어야 한다.
    
    =  “각 peer들이 가지고 있는 정보들의 상호 전달”이 우선 되어야 한다.
    
    - Session Control Message
    - Error Message
    - Codec
    - Bandwith
    - …
    
    이것들을 중계해주는 역할을 하는 서버 = signaling server
    
    WebRTC와는 별개로 signaling server는 직접 구축해야한다.
    
    일반적으로 클라이언트 사이드와 WebSocket을 사용해서 통신한다.
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea490655-bf3c-40ad-ac23-f898e3201cf2/Untitled.png)
    
    1. A에서 Signaling Server로 연결에 필요한 자신의 데이터를 보낸다.
        
        Signaling Offer
        
    2. 서버에서 연결된 모든 세션들에게 해당 데이터를 전달한다.
    3. A데이터를 받은  B에서 A의 데이터를 활용해서 연결에 필요한 일련의 작업 후, 자신의 데이터도 Signaling Server에 보낸다.
        
        Signaling Answer
        
    4. 서버에서 A에게 B의 데이터를 전송한다.
    5. 각각의 데이터를 활용해서 WebRTC가 A와 B를 연결한다.

→ Signaling Server를 이용하면 Peer간 통신 해결 가능

But!!! 통신 중간에 방화벽, NAT 환경에 놓여있는 Peer에 대해서는 직접적인 Signaling 불가능

1. STUN Server

클라이언트 자신의 공인IP를 알려주는 서버

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dc5bc4b2-febf-4564-a11d-8cf8e9bb370c/Untitled.png)

받은 IP를 활용해서 Signaling

단순히 정보 제공을 위한 서버이기 때문에 트래픽 발생이 현저히 낮다.

무료 STUN서버를 이용해도 무관하며 오픈소스, 구글등에서 운영하는 서버를 사용해도 된다.

But!!! 이렇게 해결을 해도 보호정책이 강한 NAT나 라우터(보통 Symmetric NAT)환경 에서는 해결이 안된다.

이걸 우회해주는 역할을 하는 TURN 서버

1. TURN 서버

결국 TURN 서버가 Peer간 통신을 중계해주는 역할을 한다.

→ WebRTC의 가장 큰 특징인 P2P방식이 아니게 된다.

 → 모든 트래픽을 중계하므로 상당한 부하를 감당해야하고 고비용 발생

→ Local IP, Public IP 모두 연결이 안 될 경우, 최후의 보루

직접 구현해야하고, COTURN이라는 오픈소스를 활용해 서버 구축 가능

위의 내용 : Mesh 방식

서버의 자원은 적게 들지만 Peer수가 늘어날수록 Client 사이드의 과부하가 급격하게 증가

Mesh 방식은 미디어서버 불필요

1. 미디어 서버

SFU, MCU 방식의 WebRTC에서 필요한 서버

각각의 Peer들은 `Media Server`에게 미디어 스트림들을 쏴주고 `Media Server`에서 미디어 트래픽을 관리하여 각각의 Peer에게 다시 배포해주는 멀티미디어 미들웨어

WebRTC의 특징은 P2P통신이 아니게됨 (TURN서버와 유사)

클라이언트 부하 감소, 서버 부하가 커지고 난이도 증가

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/884ffc84-68af-4c76-a66c-a3d46a26783f/Untitled.png)

### 1. Mesh 방식

**특징**

- 앞서 설명한 `Signaling Server`, `STUN Server`, `TURN Server`를 사용하는 **전형적인 P2P `WebRTC` 구현 방식이다.**
- **1:1 연결 혹은 소규모 연결에 적합하다.**

**장점**

- Peer간의 `Signaling` 과정만 서버가 중계하기 때문에 **서버의 부하가 적다.**
- 직접적으로 Peer간 연결되기 때문에 **실시간 성이 보장**된다.

**단점**

- 연결된 Client의 수가 늘어날 수록 **Client의 과부하가 급격하게 증가한다!**
- 간단하게 생각해봐도 N명이 접속한 화상회의라면, 클라이언트 각각에서 N-1개의 연결을 유지해야 하기 때문이다.

### 2. MCU(Multi-point Control Unit) 방식

**특징**

- 다수의 송출 미디어 데이터를 **`Media Server`에서 혼합(muxing) 또는 가공(transcoding)하여 수신측으로 전달하는 방식.**
- **P2P 방식 X, Server와 Client 간의 peer를 연결한다.**
- `Media Server`의 매우 높은 컴퓨팅 파워가 요구된다.

**장점**

- **Client의 부하가 크게 줄어든다.**
- **N:M 구조에서 사용 가능하다.**

**단점**

- **실시간 성이 저해된다.**
- 구현 난도가 상당히 어려우며 **비디오와 오디오를 혼합 및 가공하는 과정에서 고난도 기술과 서버의 큰 자원이 필요하다.**

### 3. SFU(Selective Forwarding Unit) 방식

**특징**

- 각각의 Client 간 미디어 트래픽을 중계하는 **`Media Server`를 두는 방식.**
- **P2P 방식 X, Server와 Client 간의 peer를 연결한다.**
- Server에게 자신의 영상 데이터를 보내고, 상대방의 수만큼 데이터를 받는 형식.
- 1:N 혹은 소규모 N:M 형식의 실시간 스트리밍에 적합하다.

**장점**

- `Mesh` 방식보다 느린 것은 어쩔수 없다. 하지만 **비슷한 수준의 실시간성을 유지할 수 있다.**
- `Mesh` 방식보다는 Client의 부하가 줄어든다.

**단점**

- `Mesh` 방식보다는 **서버의 부하가 늘어난다.**
- **대규모 N:M 구조에서는 여전히 Client의 부하가 크다.**

WebRTC(Web Real-Time Communications)

---

웹 어플리케이션(최근에는 android 및 ios도 지원) 및 사이트들이 별도의 소프트웨어 없이 음성, 영상 미디어 혹은 텍스트, 파일 같은 데이터를 브라우져끼리 주고 받을 수 있게 만든 기술

웹 브라우저 상에서 **어떤 플러그인 없이 음성채팅은 물론이며 화상채팅, 데이터 교환 까지도 가능하게하는 기술**

결론!

두 가지 선택지가 있다.

WebRTC(API)를 이용할래? 아니면 중계서버 구축할래?

(서버를 구축한다는 것.. 데이터를 받아서 어떤 형식으로 어떤 경로로 보내줄지 규칙을 정한다는 것)

당연히 있는 거 쓰지!

WebRTC를 채택하자!
