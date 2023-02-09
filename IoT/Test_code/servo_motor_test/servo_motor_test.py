import RPi.GPIO as GPIO
import time

servo_pin = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(servo_pin, GPIO.OUT)
pwm = GPIO.PWM(servo_pin, 50)

pwm.start(3.0)

for cnt in range(0, 2):
    pwm.ChangeDutyCycle(5.5)  #left
    time.sleep(1.0)
    pwm.ChangeDutyCycle(7.5)  #center
    time.sleep(1.0)
    pwm.ChangeDutyCycle(9.5)  #right
    time.sleep(1.0)
    pwm.ChangeDutyCycle(7.5)  #center
    time.sleep(1.0)

pwm.ChangeDutyCycle(0.0)

pwm.stop()
GPIO.cleanup()