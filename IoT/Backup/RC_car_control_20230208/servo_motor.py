import RPi.GPIO as GPIO
import time

class SERVO_MOTOR:
    
    def __init__(self, servo_pin):
        
        try:
            GPIO.setmode(GPIO.BCM)
            GPIO.setup(servo_pin, GPIO.OUT)
            
            self.pwm = GPIO.PWM(servo_pin, 50)
            self.pwm.start(7.75)
            time.sleep(0.3)
            
            print('servo_motor GPIO pin setting complete')
            
        except:
            print('servo_motor GPIO pin setting failed')
    
    def steering(self, direction, flag_handling):
        print('flag_handling :', flag_handling)
        try:
            if (direction == 'center'):
                self.pwm.ChangeDutyCycle(7.75)
                time.sleep(0.3)
                
            elif (direction == 'left'):
                self.pwm.ChangeDutyCycle(5.5)
                time.sleep(0.3)
                print('left')
                
            elif (direction == 'right'):
                self.pwm.ChangeDutyCycle(9)
                time.sleep(0.3)
                print('right')
            
            flag_handling = False
        
        except:
            print('servo_motor.steering Error')
            