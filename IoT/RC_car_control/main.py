from DC_motor import DC_MOTOR
from servo_motor import SERVO_MOTOR
from car import CAR
from ClientSocket import ClientSocket
from color import COLOR

def main():
    TCP_IP = '3.35.3.27'
    TCP_PORT = 8081
    
    dc_enable = 27
    dc_input_1 = 15
    dc_input_2 = 18
    
    servo_pin = 17

    color_s2 = 23
    color_s3 = 24
    color_signal = 25
    color_cycles = 10
    
    car_A = CAR()
    car_transmission = DC_MOTOR(dc_enable, dc_input_1, dc_input_2)
    car_handle = SERVO_MOTOR(servo_pin)
    color = COLOR()
    
    client = ClientSocket(TCP_IP, TCP_PORT, car_A, car_transmission, car_handle)

if __name__ == "__main__":    
    main()

