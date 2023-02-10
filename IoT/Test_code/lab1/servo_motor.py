import RPi.GPIO as GPIO
import time

class SERVO_MOTOR:
    
    def __init__(self, servo_pin):
        
        try:
            GPIO.setmode(GPIO.BCM)
            GPIO.setup(servo_pin, GPIO.OUT)
            
            self.pwm = GPIO.PWM(servo_pin, 50)
            self.error = 0
            self.pwm.start(7.75)
            time.sleep(0.3)
                        
        except Exception as e:
            self.error = 1
            print('SERVO MOTOR ERROR :', e)
    
    def steering(self, direction):
        
        try:
            if (direction == 'center'):
                self.pwm.ChangeDutyCycle(7.75)
                time.sleep(0.3)
                
            elif (direction == 'left'):
                self.pwm.ChangeDutyCycle(5.5)
                time.sleep(0.3)
                
            elif (direction == 'right'):
                self.pwm.ChangeDutyCycle(9)
                time.sleep(0.3)
            
            flag_handling = False
        
        except:
            print('servo_motor.steering Error')
            