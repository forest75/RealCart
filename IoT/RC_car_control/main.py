import threading 
from DC_motor import DC_MOTOR
from servo_motor import SERVO_MOTOR
from car import CAR
from color import COLOR
from ClientSocket import ClientSocket

def driving(self, car_transmission):
    try:
        while True:
            key_up = 38
            key_down = 40
            
            if (self.car_A.command == key_up):
                self.car_A.speed = self.car_A.speed + 10                
                if (self.car_A.speed > 100): self.car_A.speed = 100
            
            if (self.car_A.command == key_down):
                self.car_A.handle = 'center'
                self.car_A.speed = self.car_A.speed - 10                
                if (self.car_A.speed < -100): self.car_A.speed = -100
            
            car_transmission.drive(self.car_A.speed)
    
    except:
        print('driving Error')

def slowdown(self, car_transmission):
    try:
        while True:
            self.car_A.speed *= 0.9
            car_transmission.drive(self.car_A.speed)
            SERVO_MOTOR.sleep(0.5)

    except:
        print("slow down Error!")
            

def main():
    TCP_IP = '3.35.3.27'
    TCP_PORT = 8081
    
    dc_enable = 27
    dc_input_1 = 15
    dc_input_2 = 18

    color_s2 = 23
    color_s3 = 24
    color_signal = 25
    color_cycles = 10
    
    servo_pin = 17
    
    car_A = CAR()
    car_transmission = DC_MOTOR(dc_enable, dc_input_1, dc_input_2)      
    car_handle = SERVO_MOTOR(servo_pin)
    color = COLOR(color_s2, color_s3, color_signal, color_cycles, car_A)
    
    driving_thread = threading.Thread(target=driving)
    slowdown_thread = threading.Thread(target=slowdown)

                               
    client = ClientSocket(TCP_IP, TCP_PORT, car_A)


if __name__ == "__main__":    
    main()

