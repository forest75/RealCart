## 빌드 없이 openCV 라즈베리파이에 설치하기

참고 : https://github.com/dltpdn/opencv-for-rpi/releases

빌드가 되어있는  dev 파일을 다운받아서 openCV 4.2.0을 설치하자!

1. `sudo apt-get update`
2. openCV 4.2.0 릴리즈 파일 다운로드
- `wget https://github.com/dltpdn/opencv-for-rpi/releases/download/4.2.0_buster_pi3b/opencv4.2.0.deb.tar`
1. `tar -xvf opencv4.2.0.deb.tar`
2. `sudo apt-get install -y ./OpenCV*.deb`
3. `pkg-config --modversion opencv4`
- 4.2.0 이라고 나오면 설치 완료
