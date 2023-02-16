import socket
import cv2
import numpy
import time
import base64
import sys
from datetime import datetime
import threading
from DC_motor import DC_MOTOR
from servo_motor import SERVO_MOTOR
from car import CAR

class ClientSocket:
    
    def __init__(self, ip, port, car_A, car_gear, car_handle):
        self.TCP_SERVER_IP = ip
        self.TCP_SERVER_PORT = port
        self.car_A = car_A
        self.car_gear = car_gear
        self.car_handle = car_handle
        self.connectCount = 0
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
            recv_thread.start()
            send_thread = threading.Thread(target=self.sendData)
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
        try:
            while True:
                timeStamp = time.time()
                data = f"{{time: {timeStamp}, gate: {self.car_A.gate}}}"
                length = str(len(data.encode()))    # b''
                #self.sock.sendall(length.encode('utf-8').ljust(128))  # timestamp의 length
                #print(length)
                #print(data.encode())
                #self.sock.send(data.encode())  # 실제 보낼 데이터
                time.sleep(1)

        except Exception as e:
            print(e)
            self.sock.close()
            time.sleep(1)
            self.connectServer()


    def recv(self):

        flag_release = False
        flag_handling = False

        while True:
            data = self.sock.recv(2)
            int_data = int.from_bytes(data, byteorder='little')            
            #print('Data :', int_data)
            
            stop  = 0
            forward  = 1
            backward = 2
            
            key_up = 38
            key_down = 40
            key_left = 37
            key_right = 39
            key_shift = 32
            key_release = 41
                                    
            if (int_data == key_up):
                self.car_A.speed = self.car_A.speed + 10                
                if (self.car_A.speed > 100): self.car_A.speed = 100
            
            if (int_data == key_down):
                self.car_A.speed = self.car_A.speed - 10                
                if (self.car_A.speed < -100): self.car_A.speed = -100
            
            if (int_data == key_left and flag_handling == False):
                flag_handling = True
                handle_thread = threading.Thread(target=self.car_handle.steering, args=('left', flag_handling))
            
            if (int_data == key_right and flag_handling == False):
                flag_handling = True
                handle_thread = threading.Thread(target=self.car_handle.steering, args=('right'))
            
            if (int_data == key_shift):
                self.car_A.speed = 0
                
            if (int_data == key_release):
                flag_release = True
            
            if (flag_release == True):
                handle_thread = threading.Thread(target=self.car_handle.steering, args=('center'))
                flag_release = False            
            
            self.car_gear.drive(self.car_A.speed)

