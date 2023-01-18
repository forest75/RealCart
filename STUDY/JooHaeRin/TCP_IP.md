# 1. 네트워크 기본

---

---

## 1.1 Protocol

통신의 약속

---

### 1.1.1 IP

송수신 호스트간의 통신 규약

패킷/데이터그램 이라고 하는 덩어리로 나뉘어 전송

- IP 프로토콜의 한계점
    
    **비신뢰성**
    
    - 패킷을 받을 대상이 없거나 도착지의 주소가 불능 상태여도 패킷을 전송한다.
    
    **비연결성**
    
    - 통신 도중 패킷이 사라질 수도 있다.
    - 패킷이 보낸 순서대로 도착하지 않을 수도 있다.

`IP Address` = Internet Protocol = 인터넷 상에 있는 컴퓨터의 고유한 주소

---

### 1.1.2 TCP/UDP

### UDP

*Usert Datagram Protocol*

- 기능이 거의 없다.
- 속도가 빠르다.
- 최신 HTTP에서는 UDP 채택
- 데이터 전달 보증 X
- 순서 보증 X

---

### 1.1.3 Port

동시다발적 통신을 위한 가상의 문

*Well-Known Port Number,* 0~1023, 예약된 번호들

*Registered Port,* 1024 ~ 49151, 여러 툴이 쓰는 번호들

*Dynamic Port,* 49152 ~ 65535, 임의 사용 번호들

- 80 / 443 : HTTP / HTTPS
- 22 : FTP / SSH
- 3306 : MySQL
- 8080 : HTTP 대체용

---

# 2. Socket

---

---

### 2.1 Socket

컴퓨터 네트워크를 경유하는 프로세스 간 통신의 종착점 

인터페이스(콘센트)

내부 프로토콜 원리를 몰라도 Socket Interface만 알고있으면 통신 가능

---

### 2.2 구현

### **2.2.1 EC2 인스턴스 생성 후 보안 그룹 구성**

### 2.2.2 AWS EC2 서버환경 설정

**미러변경**

1. vim으로 sources.list 열기

`sudo vi etc/apt/sources.list`

1. 찾아바꾸기 명령으로 kr.archive.ubuntu.com을 mirror.kakao.com로 변경

`:%s/ap-northeast-2.ec2.archive.ubuntu/mirror.kakao/g`

:[범위]s[대상문자열]/[바꿀문자열]g | 범위 내 모든 행에서 대상문자열을 바꿀문자열로 치환

**서버 환경 설정**

1. 패키지 리스트 업데이트

`sudo apt update`

1. 서버 시간 세팅

`sudo timedatectl set-timezone Asia/Seoul`

`date`

싸피 내부 보안 문제로 시간 동기화가 안되는 문제가 발생할 수 있는데, 이럴 경우 수동으로 설정

`date -s “0000-00-00 00:00:00”`

1. 빌드 환경 구성

`sudo apt install gcc cmake`

1. 작업 디렉토리 생성

### 2.3 echo 서버 구현

클라이언트는 서버와 프로그램의 목적이 다르기때문에 다른 함수를 사용한다.

- TCP기반 서버 기본 함수 호출 순서
    1. `socket()` 소켓생성
    2. `bind()` 소켓에서 주소할당
    3. `listen()` 클라이언트 연결 요청 대기
    4. `accept()` 클라이언트 연결 승인
    5. `read() / write()` 통신
    6. `close()` 소켓닫기
- TCP기반 클라이언트 기본 함수 호출순서
    1. `socket()` 소켓생성
    2. `connect()` 연결요청
    3. `read() / write()` 데이터 송수신
    4. `close()` 연결종료
    

## WebSocket - Echo Server

### echo 코드 분석

`server.c`

```c
#include <stdio.h>
#include <signal.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <string.h>

// 서비스할 포트 미리 정해둠
// IP는 bind에서 알아서 잡을거니까 적을 필요가 없다.
const char *PORT = "12345";

// 서버에서 클라이언트를 알아야하니까 클라이언트소켓도 정의
int server_sock;
int client_sock;

// 파일디스크립터
void interrupt(int arg)
{
	printf("\nYou typed Ctrl + C\n");
	printf("Bye\n");

	close(client_sock);
	close(server_sock);
	exit(1);
}

void removeEnterChar(char *buf)
{
	int len = strlen(buf);
	for (int i = len - 1; i >= 0; i--)
	{
		if (buf[i] == '\n')
			buf[i] = '\0';
		break;
	}
}

int main()
{
	// SIGINT라는 신호가 오면 interrupt를 실행하라.(콜백)
	// SIGINT(= Ctrl + C)누를 경우 interrupt로 (가서 안전종료)
	// interrupt를 정의하지 않으면 socket이 close가 안됨 -> 메모리 뜸
	signal(SIGINT, interrupt);

	// socket create
	// socket(PF_INET, SOCK_STREAM, 0) : TCP/IPv4 소켓 만들어라.
	// socket() : 성공 시 파일디스크립터, 실패 시 -1
	// PF_INET : IPv4 쓰자
	// SOCK_STREAM : 연결지향형 소켓
	// 두 개를 합치면 TCP밖에 없다. -> 0
	server_sock = socket(PF_INET, SOCK_STREAM, 0);
	if (server_sock == -1)
	{
		printf("ERROR :: 1_Socket Create Error\n");
		exit(1);
	}

	// option setting
	// 종료 시 3분 정도 동일한 포트 배정 불가 에러 해결
	int optval = 1;
	setsockopt(server_sock, SOL_SOCKET, SO_REUSEADDR, (void *)&optval, sizeof(optval));

	// 주소 설정
	// socekt과 bind 사이에 위치
	// server_addr의 타입 sockaddr_in
	// 여기서 주소 정보를 입힌다음에 소켓에 저장
	// AF_INET : IPv4방식
	// atoi : port가 문자열이니까 바꿔주는 함수
	// htonl : int형 IP를 빅 엔디안으로 변경
	// htons : int형 PORT를 빅 엔디안으로 변경
	struct sockaddr_in server_addr = {0};
	server_addr.sin_family = AF_INET;
	server_addr.sin_addr.s_addr = htonl(INADDR_ANY);
	server_addr.sin_port = htons(atoi(PORT));

	// bind
	// (struct sockaddr *)&server_addr
	// -> socketadd_in 으로 만들었어서 socketadd로 구조체 형변환
	// 사람이 이해하기 쉬운 타입으로 만들어서 컴퓨터가 이해하기 쉬운 형으로 형변환해서 갖다쓰기
	if (bind(server_sock, (struct sockaddr *)&server_addr, sizeof(server_addr)) == -1)
	{
		printf("ERROR :: 2_bind Error\n");
		exit(1);
	}

	// listen
	// 대기실 생성 구문
	if (listen(server_sock, 5) == -1)
	{
		printf("ERROR :: 3_listen Error");
		exit(1);
	}

	// 처음에 선언만 하고 초기화를 안했음. 근데 안해도됨.
  // C는 알아서 전역선언 -> 0처리
	client_sock = 0;
	struct sockaddr_in client_addr = {0};
	socklen_t client_addr_len = sizeof(client_addr);

	while (1)
	{
		// 새로운 클라이언트를 위해 초기화
		memset(&client_addr, 0, sizeof(client_addr));

		// accpet
		client_sock = accept(server_sock, (struct sockaddr *)&client_addr, &client_addr_len);
		if (client_sock == -1)
		{
			printf("ERROR :: 4_accept Error\n");
			break;
		}

		// read & write
		// 읽고 나서(read) 그걸 그대로 돌려준다.(write)
		char buf[100];
		while (1)
		{
			memset(buf, 0, 100);
			// 나중에 안전종료할 때, len값을 보고 판단
			int len = read(client_sock, buf, 99);

			// remove '\n'
			removeEnterChar(buf);

			// client 와 연결이 끊어졌을 때 클라이언트 종료
			if (len == 0)
			{
				printf("INFO :: Disconnect with client... BYE\n");
				break;
			}

			// client 에서 exit 입력했을 때 클라이언트 종료
			if (!strcmp("exit", buf))
			{
				printf("INFO :: Client want close... BYE\n");
				break;
			}
			write(client_sock, buf, strlen(buf));
		}
		// 클라이언트 소켓 close
		close(client_sock);
	}
	// 서버 소켓 close
	close(server_sock);
	return 0;
}
```

`client.c`

```c
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <signal.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <string.h>

// AWS IP
const char *IP = "127.0.0.1";
const char *PORT = "12345";

int sock;

void interrupt(int arg)
{
	printf("\nYou typped Ctrl + C\n");
	printf("Bye\n");

	close(sock);
	exit(1);
}

int main()
{
	signal(SIGINT, interrupt);

	sock = socket(PF_INET, SOCK_STREAM, 0);
	if (sock == -1)
	{
		printf("ERROR :: 1_Socket Create Error\n");
		exit(1);
	}

	struct sockaddr_in addr = {0};
	addr.sin_family = AF_INET;
	addr.sin_addr.s_addr = inet_addr(IP);
	addr.sin_port = htons(atoi(PORT));

	// Connect
	// listen으로 들어간 상황
	if (connect(sock, (struct sockaddr *)&addr, sizeof(addr)) == -1)
	{
		printf("ERROR :: 2_Connect Error\n");
		exit(1);
	}

	char buf[100];
	while (1)
	{
		memset(buf, 0, 100);
		scanf("%s", buf);
		if (!strcmp(buf, "exit"))
		{
			write(sock, buf, strlen(buf));
			break;
		}
		// 여기서 서버로 송신
		write(sock, buf, strlen(buf));
		memset(buf, 0, 100);
		int len = read(sock, buf, 99);
		// 만약 서버에서 0을 회신했으면 연결이 끊어졌다고 판단
		if (len == 0)
		{
			printf("INFO :: Server Disconnected\n");
			break;
		}
		printf("%s\n", buf);
	}

	// close sock
	close(sock);
	return 0;
}
```

### 소켓을 끄는 경우

총 6개의 상황에서 소켓을 적시적소에 꺼야한다.

- 클라이언트 소켓의 종료 조건
    1. 인터럽트 발생 (Ctrl + C)
    2. exit입력
    3. read() 결과가 0 = 서버가 종료됐을 때
- 서버 소켓의 종료 조건
    1. 인터럽트 발생 (Ctrl + C)
- 서버의 클라이언트 소켓의 종료 조건
    1. read() 결과가 0 = 클라이언트가 종료됐을 때
    2. client가 exit를 보냈을 때
