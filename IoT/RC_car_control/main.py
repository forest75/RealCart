import threading 
from DC_motor import DC_MOTOR
from servo_motor import SERVO_MOTOR
from car import CAR
from color import COLOR
from ClientSocket import ClientSocket

def main():
    #TCP_IP = '3.35.3.27'   # Game Server IP
    #TCP_IP = '70.12.246.218' #Park seongmin IP
    TCP_IP = '127.0.0.1'  # Simulator IP
    TCP_PORT = 8081
    
    dc_enable = 27
    dc_input_1 = 15
    dc_input_2 = 18

    color_s2 = 23
    color_s3 = 24
    color_signal = 25
    
    servo_pin = 17
    
    car_A = CAR()
    car_gear = DC_MOTOR(dc_enable, dc_input_1, dc_input_2)      
    car_handle = SERVO_MOTOR(servo_pin)
    color = COLOR(color_s2, color_s3, color_signal, car_A)
    
    color_thread = threading.Thread(target=color.is_passing_gate)
    #driving_thread = threading.Thread(target=driving)
    #slowdown_thread = threading.Thread(target=slowdown)
    
    color_thread.start()
    
    client = ClientSocket(TCP_IP, TCP_PORT, car_A, car_gear, car_handle)


if __name__ == "__main__":    
    main()

