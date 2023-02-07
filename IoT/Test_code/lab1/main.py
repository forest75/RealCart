import sys
import time
import threading
import socket
#import cv2
#import numpy
import time
import base64
import sys
from datetime import datetime
import threading
from DC_motor import DC_MOTOR
from servo_motor import SERVO_MOTOR
from color import COLOR

class ClientSocket:
    
    def __init__(self, ip, port):
        self.TCP_SERVER_IP = ip
        self.TCP_SERVER_PORT = port
        self.connectCount = 0
        self.gate_no = -1
        self.connectServer()

    def connectServer(self):
        print("initial connecting...")
        try:
            self.sock = socket.socket()
            self.sock.connect((self.TCP_SERVER_IP, self.TCP_SERVER_PORT))
            print(
                u'Client socket is connected with Server socket [ TCP_SERVER_IP: ' + self.TCP_SERVER_IP + ', TCP_SERVER_PORT: ' + str(
                    self.TCP_SERVER_PORT) + ' ]')
            self.connectCount = 0
            
            recv_thread = threading.Thread(target=self.recv)
            send_thread = threading.Thread(target=self.sendData)
            
            recv_thread.start()
            send_thread.start()

        except Exception as e:
            print(e)
            self.connectCount += 1
            if self.connectCount == 10:
                print(u'Connect fail %d times. exit program' % (self.connectCount))
                sys.exit()
            print(u'%d times try to connect with server' % (self.connectCount))
            self.connectServer()

    def sendData(self):
        global car_speed, car_gate, car_state
        
        try:
            while True:

                timeStamp = round(time.time() * 1000)
                data = f"{{\"carNum\" : 1, \"time\": timeStamp , \"speed\" : car_speed, \"gateNo\" : car_gate, \"status\" : car_state }}"
                length = str(len(data.encode()))
                # timestamp length
                self.sock.sendall(length.encode('utf-8').ljust(128))
                self.sock.send(data.encode())  # real send data

                time.sleep(1)

        except Exception as e:
            print(e)
            self.sock.close()
            time.sleep(1)
            self.connectServer()


    def recv(self):
        global recv_data
        global flag_up, flag_down, flag_shift, flag_left, flag_right, flag_release
        while True:
            data = self.sock.recv(2)
            recv_data = int.from_bytes(data, byteorder='little')
            
            key_up = 38
            key_down = 40
            key_shift = 32
            key_left = 37
            key_right = 39
            key_release = 41
            print('recv_data:', recv_data)
            if (recv_data == key_up and flag_up == False): flag_up = True
            if (recv_data == key_down and flag_down == False): flag_down = True
            if (recv_data == key_shift and flag_shift == False): flag_shift = True
            if (recv_data == key_left and flag_left == False): flag_left = True
            if (recv_data == key_right and flag_right == False): flag_right = True
            if (recv_data == key_release and flag_release == False): flag_release = True
    
    

def driving():
    global car_gear, car_speed
    global flag_up, flag_down, flag_shift
        
    while True:
        
        if flag_up:
            car_speed += 1
            if (car_speed > 100): car_speed = 100
            flag_up = False
        
        elif flag_down:
            car_speed -= 1
            if (car_speed < -100): car_speed = -100
            flag_down = False
        
        elif flag_shift:
            car_speed = 0
            flag_shift = False
        
        else:
            if (car_speed < 1): car_speed = 0
            #car_speed *= 0.95
        
        car_gear.drive(car_speed)
        #print('car_speed :', car_speed)
        time.sleep(0.1)


def handling():
    global car_handle
    global flag_left, flag_right, flag_release
    
    while True:
        if flag_left:
            car_handle.steering('left')
            flag_left = False
        
        if flag_right:
            car_handle.steering('right')
            flag_right = False
        
        if flag_release:
            car_handle.steering('center')
            flag_release = False


def gate_passing():
    global car_color
    global car_gate

    while True:
        gate_no = car_color.color_sensing()  # return data = gate_no
        
        if (gate_no != -1):
            car_gate = gate_no

def main():
    global recv_data, car_gear, car_handle, car_speed, car_color, car_gate
    global flag_up, flag_down, flag_shift, flag_left, flag_right, flag_release
    
    recv_data = 0

    TCP_IP = "i8a403.p.ssafy.io"
    
    if (len(sys.argv) == 2):
        if (sys.argv[1] == "debug"):
            TCP_IP = "127.0.0.1"
    
    TCP_PORT = 8081
    client = ClientSocket(TCP_IP, TCP_PORT)
    
    dc_enable = 27
    dc_input_1 = 15
    dc_input_2 = 18
    
    servo_pin = 17

    color_s2 = 23
    color_s3 = 24
    color_signal = 25
    
    car_speed = 0
    car_gate = 0
    
    flag_up = False
    flag_down = False
    flag_shift = False
    flag_left = False
    flag_right = False
    flag_release = False
    
    car_gear = DC_MOTOR(dc_enable, dc_input_1, dc_input_2)
    car_handle = SERVO_MOTOR(servo_pin)
    car_color = COLOR(color_s2, color_s3, color_signal)
    
    gear_thread = threading.Thread(target=driving)
    handle_thread = threading.Thread(target=handling)
    gate_sensing_thread = threading.Thread(target=gate_passing)

    gear_thread.start()
    handle_thread.start()
    gate_sensing_thread.start()
    
    gear_thread.join()
    handle_thread.join()
    gate_sensing_thread.join()


if __name__ == "__main__":    
    main()
