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
            #send_thread = threading.Thread(target=self.sendData)
            
            recv_thread.start()
            #send_thread.start()

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

    def sendData(self, data):        
        try:
            length = str(len(data.encode()))
            self.sock.sendall(length.encode('utf-8').ljust(128))
            self.sock.send(data.encode())

        except Exception as e:
            print(e)
            self.sock.close()
            #time.sleep(1)
            #self.connectServer()


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
        self.ui.le_car_no.setText(car_no)
        self.ui.lb_speed_param.setText(str(car_speed))
        self.ui.lb_gate_param.setText(str(car_gate))
        self.ui.le_ip.setText(TCP_IP)
        self.ui.le_port.setText(str(TCP_PORT))
        self.ui.lb_motor_param.setText("Disconnect")
        self.ui.lb_motor_param.setStyleSheet("Color : red")
        self.ui.lb_socket_param.setText("Disconnect")
        self.ui.lb_socket_param.setStyleSheet("Color : red")


    def readySignal(self):
        global client
        global car_speed, car_gate, car_status
        
        if (self.ui.lb_socket_param.text() != "Connect"):
            print_log('Please Connect Socket')
            return
        
        cur_time = round(time.time() * 1000)
        car_status = 1
        temp_data = make_json(cur_time, car_speed, car_gate, car_status)
        
        client.sendData(temp_data)
        print_send_data(temp_data)
        
        car_status = 0
        print_log('Completed sending Ready Signal')
        
        
        
    def finishSignal(self):
        global client
        global car_speed, car_gate, car_status
        
        if (self.ui.lb_socket_param.text() != "Connect"):
            print_log('Please Connect Socket')
            return
        
        cur_time = round(time.time() * 1000)
        car_status = 2
        temp_data = make_json(cur_time, car_speed, car_gate, car_status)
        
        client.sendData(temp_data)
        print_send_data(temp_data)
        
        car_status = 0
        print_log('Completed sending Finish Signal')


    def motorConnect(self):
        global car_gear, car_handle, car_color
        global tflag_gate_sensing, gate_sensing_thread
    
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
        
        tflag_gate_sensing = True
        gate_sensing_thread = threading.Thread(target=gate_sensing)
        gate_sensing_thread.start()
        print_log('Gate Sensing Thread Start')
        
        if (car_gear.error == 0 and car_handle.error == 0 and car_color.error == 0):
            print_log('All of Sensor/Motor GPIO Pin Setting complete')
            self.ui.lb_motor_param.setText('Connect')
            self.ui.lb_motor_param.setStyleSheet("Color : green")
        else:
            print_log('Sensor/Motor GPIO Pin Setting Fail')
            self.ui.lb_motor_param.setText('Disconnect')
            self.ui.lb_motor_param.setStyleSheet("Color : red")
            
            
    def motorDisconnect(self):
        global tflag_gate_sensing, gate_sensing_thread
        global car_gear, car_handle, car_color
        
        tflag_gate_sensing = False
        print_log('Gate Sensing Thread Kill')
        
        gate_sensing_thread.join()
        
        del car_gear
        del car_handle
        del car_color
        
        GPIO.cleanup()
        
        print_log('GPIO Pin cleanup complete')
        self.ui.lb_motor_param.setText('Disconnect')
        self.ui.lb_motor_param.setStyleSheet("Color : red")
        
    
    def socketConnect(self):
        global TCP_IP, TCP_PORT, car_gear, car_handle, car_color
        global gear_thread, handle_thread, gate_sensing_thread
        global client
        
        TCP_IP = self.ui.le_ip.text()
        TCP_PORT = int(self.ui.le_port.text())
        
        if (self.ui.lb_motor_param.text() == "Disconnect"):
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
        
        tflag_driving = True
        tflag_handling = True
        
        gear_thread = threading.Thread(target=driving)
        handle_thread = threading.Thread(target=handling)
                
        gear_thread.start()
        handle_thread.start()
        
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
        
        
    def socketDisconnect(self):
        pass
        
        
    def colorMatching(self):
        global color_rgb
        
        data_count = 100
        offset = 100
        
        min_red = 987654321
        max_red = 0
        min_green = 987654321
        max_green = 0
        min_blue = 987654321
        max_blue = 0
        
        while (data_count):
            min_red = min(min_red, color_rgb[0])
            max_red = max(max_red, color_rgb[0])
            min_green = min(min_green, color_rgb[1])
            max_green = max(max_green, color_rgb[1])
            min_blue = min(min_blue, color_rgb[2])
            max_blue = max(max_blue, color_rgb[2])
            
            data_count -= 1
        
        min_red -= offset
        max_red += offset
        min_green -= offset
        max_green += offset
        min_blue -= offset
        max_blue += offset
        
        temp_no = self.ui.sb_gate.value()
        gate = [min_red, max_red, min_green, max_green, min_blue, max_blue]
        
        str_gate = "{0},{1},{2},{3},{4},{5}".format(min_red, max_red, min_green, max_green, min_blue, max_blue)
        
        if (temp_no == 1):
            self.ui.le_gate1.setText(str_gate)
        elif (temp_no == 2):
            self.ui.le_gate2.setText(str_gate)
        elif (temp_no == 3):
            self.ui.le_gate3.setText(str_gate)
        elif (temp_no == 4):
            self.ui.le_gate4.setText(str_gate)
        
        print_log("gate {0} Color Matching is finished".format(temp_no))
        
        
    def closeEvent(self, event):
        global gear_thread, handle_thread, gate_sensing_thread
        global tflag_handling, tflag_driving, tflag_gate_sensing
            
        quit_msg = "Do you want to close this window?"
        reply = QMessageBox.question(self, 'Message', quit_msg, QMessageBox.Yes, QMessageBox.No)
        
        if reply == QMessageBox.Yes:
            
            tflag_handling = False
            tflag_driving = False
            tflag_gate_sensing = False
            
            gear_thread.join()
            handle_thread.join()
            gate_sensing_thread.join()
                        
            GPIO.cleanup()
            
            event.accept()
        else:
            event.ignore()
    
            
def make_json(timestamp, speed, gateNo, status):
    json_data = f"{{\"timestamp\": {timestamp} , \"speed\" : {speed}, \"gateNo\" : {gateNo}, \"status\" : {status} }}"
    return json_data

def print_log(msg):
    global win    
    win.ui.tb_log.append(msg)


def print_recv_data(data):
    global win
    win.ui.tb_recv_data.append(str(data))
    
    
def print_send_data(data):
    global win
    win.ui.tb_send_data.append(str(data))


def print_rgb(color_rgb):
    global win
    color_data = "{0}, {1}, {2}".format(color_rgb[0], color_rgb[1], color_rgb[2])
    win.ui.lb_rgb_param.setText(color_data)

    
def driving():
    global car_gear, car_speed
    global flag_up, flag_down, flag_shift
        
    while tflag_driving:
        
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
        
        car_gear.drive(car_speed)
        time.sleep(0.1)


def handling():
    global car_handle
    global flag_left, flag_right, flag_release
    
    while tflag_handling:
        
        if flag_left:
            car_handle.steering('left')
            flag_left = False
        
        if flag_right:
            car_handle.steering('right')
            flag_right = False
        
        if flag_release:
            car_handle.steering('center')
            flag_release = False


def gate_sensing():
    global car_color, tflag_gate_sensing
    global car_gate, color_rgb

    while tflag_gate_sensing:    
        color_rgb = car_color.color_sensing()
        print_rgb(color_rgb)
        

if __name__ == "__main__":
    global car_model, car_no, car_speed, car_gate, car_status
    global tflag_gate_sensing, tflag_driving, tflag_handling
    global TCP_IP, TCP_PORT
    global win

    car_model = "SSAFY_01"
    car_no = '1'
    car_speed = 0
    car_gate = 0
    car_status = 0
    
    TCP_IP = 'i8a403.p.ssafy.io'
    TCP_PORT = 8081
    
    tflag_gate_sensing = False
    tflag_driving = False
    tflag_handling = False

    app = QApplication()
    win = MyApp()
    win.show()
    app.exec_()
