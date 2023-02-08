import sys
import time
import threading
import socket
import time
import base64
import sys
from datetime import datetime
import threading
import RPi.GPIO as GPIO
from PySide2.QtWidgets import *
from RC_car_ui import Ui_MainWindow
from DC_motor import DC_MOTOR
from servo_motor import SERVO_MOTOR
from color_sensor import COLOR

class ClientSocket:
    
    def __init__(self, ip, port):
        self.TCP_SERVER_IP = ip
        self.TCP_SERVER_PORT = port
        self.connectCount = 0
        self.gate_no = -1
        self.error = 0
        self.connectServer()

    def connectServer(self):
        print_log("initial connecting...")
        try:
            self.sock = socket.socket()
            self.sock.connect((self.TCP_SERVER_IP, self.TCP_SERVER_PORT))
            print_log(
                u'Client socket is connected with Server socket [ TCP_SERVER_IP: ' + self.TCP_SERVER_IP + ', TCP_SERVER_PORT: ' + str(
                    self.TCP_SERVER_PORT) + ' ]')
            self.connectCount = 0
            self.error = 0
            
            recv_thread = threading.Thread(target=self.recv)
            send_thread = threading.Thread(target=self.sendData)
            
            recv_thread.start()
            send_thread.start()

        except Exception as e:
            print(e)
            self.connectCount += 1
            self.error = 1
            
            if self.connectCount == 10:
                print_log(u'Connect fail %d times. exit program' % (self.connectCount))
                #sys.exit()
            else:
                print_log(u'%d times try to connect with server' % (self.connectCount))
                self.connectServer()

    def sendData(self):
        global car_speed, car_gate, car_state
        
        try:
            while True:

                timeStamp = round(time.time() * 1000)
                data = f"{{\"time\": timeStamp , \"speed\" : car_speed, \"gateNo\" : car_gate, \"status\" : car_state }}"
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
        
        flag_up = False
        flag_down = False
        flag_left = False
        flag_right = False
        flag_release = False
        flag_shift = False
        
        while True:
            data = self.sock.recv(2)
            recv_data = int.from_bytes(data, byteorder='little')
            
            key_up = 38
            key_down = 40
            key_shift = 32
            key_left = 37
            key_right = 39
            key_release = 41
            
            print_recv_data(recv_data)
            
            if (recv_data == key_up and flag_up == False): flag_up = True
            if (recv_data == key_down and flag_down == False): flag_down = True
            if (recv_data == key_shift and flag_shift == False): flag_shift = True
            if (recv_data == key_left and flag_left == False): flag_left = True
            if (recv_data == key_right and flag_right == False): flag_right = True
            if (recv_data == key_release and flag_release == False): flag_release = True

class MyApp(QMainWindow, Ui_MainWindow):
    def __init__(self):
        global car_model, car_no, car_speed, car_gate, TCP_IP, TCP_PORT

        super().__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.ui.lb_model_param.setText(car_model)
        self.ui.lb_car_no_param.setText(car_no)
        self.ui.lb_speed_param.setText(str(car_speed))
        self.ui.lb_gate_param.setText(str(car_gate))
        self.ui.le_ip.setText(TCP_IP)
        self.ui.le_port.setText(str(TCP_PORT))
        self.ui.lb_motor_param.setStyleSheet("Color : red")
        self.ui.lb_socket_param.setStyleSheet("Color : red")


    def readySignal(self):
        self.ui.tb_log.append('ready')
        
    def finishSignal(self):
        pass


    def motorConnect(self):
        global car_gear, car_handle, car_color
    
        dc_enable = 27
        dc_input_1 = 15
        dc_input_2 = 18
    
        servo_pin = 17

        color_s2 = 23
        color_s3 = 24
        color_signal = 25
        
        car_gear = DC_MOTOR(dc_enable, dc_input_1, dc_input_2)
        
        if (car_gear.error == 0):
            print_log('DC motor GPIO Pin Setting Complete')
        else:
            print_log('DC motor GPIO Pin Setting Fail')
        
        car_handle = SERVO_MOTOR(servo_pin)
        
        if (car_handle.error == 0):
            print_log('SERVO motor GPIO Pin Setting Complete')
        else:
            print_log('SERVO motor GPIO Pin Setting Fail')
        
        
        car_color = COLOR(color_s2, color_s3, color_signal)
        
        if (car_color.error == 0):
            print_log('Color Sensor GPIO Pin Setting Complete')
        else:
            print_log('Color Sensor GPIO Pin Setting Fail')
        
        gate_sensing_thread = threading.Thread(target=gate_passing)
        gate_sensing_thread.start()
        print_log('Gate Sensing Thread Start')
        
        if (car_gear.error == 0 and car_handle.error == 0 and car_color.error == 0):
            print_log('All of Sensor/Motor GPIO Pin Setting complete')
            self.ui.lb_motor_param.setText('Setting Done')
            self.ui.lb_motor_param.setStyleSheet("Color : green")
        else:
            print_log('Sensor/Motor GPIO Pin Setting Fail')
            self.ui.lb_motor_param.setText('Not Setting')
            self.ui.lb_motor_param.setStyleSheet("Color : red")
            

    def socketConnect(self):
        global TCP_IP, TCP_PORT, car_gear, car_handle, car_color
        global gear_thread, handle_thread, gate_sensing_thread, event_off
        
        TCP_IP = self.ui.le_ip.text()
        TCP_PORT = int(self.ui.le_port.text())
        
        if (self.ui.lb_motor_param.text() == "Not Setting"):
            print_log('Sensor/Motor GPIO Pin Setting is not finished')
            print_log('please click the Motor Connect')
            return        
        
        client = ClientSocket(TCP_IP, TCP_PORT)
        
        if (client.error == 0):
            print_log('Socket Connect Complete')
            self.ui.lb_socket_param.setText('Connect')
            self.ui.lb_socket_param.setStyleSheet("Color : green")
        else:
            print_log('Socket Connect Fail')
            self.ui.lb_socket_param.setText('Not Connect') 
            self.ui.lb_socket_param.setStyleSheet("Color : red")
            return
        
        event_off = threading.Event()
            
        gear_thread = threading.Thread(target=driving)
        handle_thread = threading.Thread(target=handling)
                
        gear_thread.start()
        handle_thread.start()
        gate_sensing_thread.start()
        
        print_log('Gear Thread Start...')
        print_log('Handle Thread Start...')
        

    def up(self):
        self.ui.tb_log.append('up')

    def down(self):
        self.ui.tb_log.append('down')

    def left(self):
        self.ui.tb_log.append('left')

    def right(self):
        self.ui.tb_log.append('right')
        
    def motorDisconnect(self):
        pass
        
    def socketDisconnect(self):
        pass
        
    def closeEvent(self, event):
        global gear_thread, handle_thread, gate_sensing_thread, thread_off, event_off
        
        quit_msg = "Do you want to close this window?"
        reply = QMessageBox.question(self, 'Message', quit_msg, QMessageBox.Yes, QMessageBox.No)
        
        if reply == QMessageBox.Yes:
            
            event_off.set()
            
            gear_thread.join()
            handle_thread.join()
            gate_sensing_thread.join()
                        
            GPIO.cleanup()
            
            event.accept()
        else:
            event.ignore()
    
            
def print_log(msg):
    global win    
    win.ui.tb_log.append(msg)


def print_recv_data(data):
    global win
    win.ui.tb_recv_Data.append(str(data))

def print_rgb(color_rgb):
    global win
    color_data = "{0}, {1}, {2}".format(int(color_rgb[0]), int(color_rgb[1]), int(color_rgb[2]))
    win.ui.lb_rgb_param.setText(color_data)

    
def driving():
    global car_gear, car_speed, event_off
    global flag_up, flag_down, flag_shift
        
    while True:
        
        if event_off.is_set():
            return
        
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
    global car_handle, event_off
    global flag_left, flag_right, flag_release
    
    while True:
    
        if event_off.is_set():
            return 
    
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
        color_rgb = car_color.color_sensing()
        print_rgb(color_rgb)
        


def main():
    global recv_data, car_gear, car_handle, car_speed, car_color, car_gate
    global flag_up, flag_down, flag_shift, flag_left, flag_right, flag_release
    
    app = QApplication()
    win = MyApp()
    win.show()
    app.exec_()
    
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
    global car_model, car_no, car_speed, car_gate, TCP_IP, TCP_PORT
    global win

    car_model = "SSAFY_01"
    car_no = '1'
    car_speed = 0
    car_gate = 0
    TCP_IP = 'i8a403.p.ssafy.io'
    TCP_PORT = 8081

    app = QApplication()
    win = MyApp()
    win.show()
    app.exec_()
