참고 : https://sourceforge.net/projects/mjpg-streamer/

# Building & Installation

cmake 설치
`sudo apt-get install cmake libjpeg8-dev`

gcc 설치
`sudo apt-get install gcc g++`

## Simple compilation

1. make 설치, 빌드
`cd mjpg-streamer-experimental`
`make`
`sudo make install`

2. debugging 모드컴파일

`cd mjpg-streamer-experimental`
`make distclean`
`make CMAKE_BUILD_TYPE=Debug`
`sudo make install`

## Advanced compilation (via CMake)

3. cmake 사용

`cd mjpg-streamer-experimental`
`mkdir _build`
`cd _build`
`cmake -DENABLE_HTTP_MANAGEMENT=ON ..`
`make`
`sudo make install`

# Usage

`export LD_LIBRARY_PATH=.`
`./mjpg_streamer -o "output_http.so -w ./www" -i "input_raspicam.so"`
