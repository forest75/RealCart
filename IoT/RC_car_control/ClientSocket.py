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
    
    def __init__(self, ip, port, car_A, car_transmission, car_handle):
        self.TCP_SERVER_IP = ip
        self.TCP_SERVER_PORT = port
        self.car_A = car_A
        self.car_transmission = car_transmission
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
            #send_thread = threading.Thread(target=self.sendImages)
            #send_thread.start()

        except Exception as e:
            print(e)
            self.connectCount += 1
            if self.connectCount == 10:
                print(u'Connect fail %d times. exit program' % (self.connectCount))
                sys.exit()
            print(u'%d times try to connect with server' % (self.connectCount))
            self.connectServer()

    def sendImages(self):
        cnt = 0
        capture = cv2.VideoCapture(0)
        capture.set(cv2.CAP_PROP_FRAME_WIDTH, 300)
        capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 200)
        
        try:
            while capture.isOpened():
                ret, frame = capture.read()
                resize_frame = cv2.resize(frame, dsize=(300, 200), interpolation=cv2.INTER_AREA)
                encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
                result, imgencode = cv2.imencode('.jpg', resize_frame, encode_param)
                data = numpy.array(imgencode)
                stringData = base64.b64encode(data)
                length = str(len(stringData))
                self.sock.sendall(length.encode('utf-8').ljust(64))
                self.sock.send(stringData)
                print(u'send images %d' % (cnt))
                cnt += 1
                time.sleep(0.7)
                
        except Exception as e:
            print(e)
            self.sock.close()
            time.sleep(1)
            self.connectServer()
            self.sendImages()

    def recv(self):
        while True:
            data = self.sock.recv(2)
            int_data = int.from_bytes(data, byteorder='little')
            print('Data :', int_data)
            
            stop  = 0
            forward  = 1
            backward = 2
            
            key_up = 38
            key_down = 40
            key_left = 37
            key_right = 39
            key_space = 32

            self.car_A.handle = 'center'
            
            if (int_data == key_up):
                self.car_A.handle = 'center'
                self.car_A.speed = self.car_A.speed + 10                
                if (self.car_A.speed > 100): self.car_A.speed = 100
            
            if (int_data == key_down):
                self.car_A.handle = 'center'
                self.car_A.speed = self.car_A.speed - 10                
                if (self.car_A.speed < -100): self.car_A.speed = -100
            
            if (int_data == key_left):
                self.car_A.handle = 'left'
                self.car_handle.steering(self.car_A.handle)
            
            if (int_data == key_right):
                self.car_A.handle = 'right'
                self.car_handle.steering(self.car_A.handel)
            
            if (int_data == key_space):
                self.car_A.speed = 0
            
            ielf.car_transmission.drive(self.car_A.speed)
           
