import RPi.GPIO as GPIO
import time
from DC_motor import DC_MOTOR
from car import CAR

class COLOR:

    def __init__(self, color_s2, color_s3, color_signal, car_A):

        try:
            GPIO.setmode(GPIO.BCM)

            GPIO.setup(color_signal, GPIO.IN, pull_up_down=GPIO.PUD_UP)
            GPIO.setup(color_s2,GPIO.OUT)
            GPIO.setup(color_s3, GPIO.OUT)

            self.color_s2 = color_s2
            self.color_s3 = color_s3
            self.color_signal = color_signal
            self.color_cycles = 10
            self.car_A = car_A

            print('Color Sensing GPIO pin Setting complete')

        except:
            print('Color Sensing GPIO pin Setting failed')

    def color_sensing(self, color_s2, color_s3, color_signal, color_cycles):

        # color
        color_pink = [2000, 4000, 1000, 3000, 2000, 4000]  # red_min, red_max, green_min, green_max, blue_min, blue_max
        color_green = [550, 800, 1500, 2000, 800, 1100]

        # Red
        GPIO.output(color_s2, GPIO.LOW)
        GPIO.output(color_s3, GPIO.LOW)
        # time.sleep(0.1)

        start = time.time()

        for impulse_count in range(color_cycles):
            GPIO.wait_for_edge(color_signal, GPIO.FALLING)

        duration = time.time() - start  # seconds to rn for loop
        red = color_cycles / duration


        # Blue
        GPIO.output(color_s2, GPIO.LOW)
        GPIO.output(color_s3, GPIO.HIGH)
        # time.sleep(0.1)

        start = time.time()

        for impulse_count in range(color_cycles):
            GPIO.wait_for_edge(color_signal, GPIO.FALLING)

        duration = time.time() - start  # seconds to rn for loop
        blue = color_cycles / duration

        # Green
        GPIO.output(color_s2, GPIO.HIGH)
        GPIO.output(color_s3, GPIO.HIGH)
        # time.sleep(0.1)

        start = time.time()

        for impulse_count in range(color_cycles):
            GPIO.wait_for_edge(color_signal, GPIO.FALLING)

        duration = time.time() - start  # seconds to rn for loop
        green = color_cycles / duration

        if color_green[0] < red < color_green[1] and color_green[2] < green < color_green[3] and color_green[4] < blue < \
                color_green[5] and self.car_A.state == 0:
            print('Ready')
            self.car_A.state = 1
            self.car_A.gate = 1

        elif color_pink[0] < red < color_pink[1] and color_pink[2] < green < color_pink[3] and color_pink[4] < blue < \
                color_pink[5] and self.car_A.state == 1:
            print('Goal')
            self.car_A.speed = 0
            DC_MOTOR.drive(self.car_A.speed)
            self.car_A.state = 0
            self.car_A.gate = 4

        return self.car_A.state