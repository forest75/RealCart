import RPi.GPIO as GPIO
import time

class COLOR:

    def __init__(self, color_s2, color_s3, color_signal):

        try:
            GPIO.setmode(GPIO.BCM)

            GPIO.setup(color_signal, GPIO.IN, pull_up_down=GPIO.PUD_UP)
            GPIO.setup(color_s2, GPIO.OUT)
            GPIO.setup(color_s3, GPIO.OUT)

            self.color_s2 = color_s2
            self.color_s3 = color_s3
            self.color_signal = color_signal
            self.error = 0

        except Exception as e:
            self.error = 1
            
            print('Color Sensor Error :', e)

    def color_sensing(self):
        gate_no = -1

        # color
        # red_min, red_max, green_min, green_max, blue_min, blue_max
        # pink, green, ..., ...
        gate_color = [[2000, 4000, 1000, 3000, 2000, 4000],
                      [550, 800, 1500, 2000, 800, 1100],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0]]

        color_cycles = 10

        # Red
        GPIO.output(self.color_s2, GPIO.LOW)
        GPIO.output(self.color_s3, GPIO.LOW)

        start = time.time()

        for impulse_count in range(color_cycles):
            GPIO.wait_for_edge(self.color_signal, GPIO.FALLING)

        duration = time.time() - start  # seconds to rn for loop
        red = color_cycles / duration

        # Blue
        GPIO.output(self.color_s2, GPIO.LOW)
        GPIO.output(self.color_s3, GPIO.HIGH)
        # time.sleep(0.1)

        start = time.time()

        for impulse_count in range(color_cycles):
            GPIO.wait_for_edge(self.color_signal, GPIO.FALLING)

        duration = time.time() - start  # seconds to rn for loop
        blue = color_cycles / duration

        # Green
        GPIO.output(self.color_s2, GPIO.HIGH)
        GPIO.output(self.color_s3, GPIO.HIGH)
        # time.sleep(0.1)

        start = time.time()

        for impulse_count in range(color_cycles):
            GPIO.wait_for_edge(self.color_signal, GPIO.FALLING)

        duration = time.time() - start  # seconds to rn for loop
        green = color_cycles / duration

        print('r, g, b:', red, blue, green)
        
        for gate_idx in range(0, 4):
            if gate_color[gate_idx][0] < red < gate_color[gate_idx][1] and gate_color[gate_idx][2] < green < gate_color[gate_idx][3] and gate_color[gate_idx][4] < blue < gate_color[gate_idx][5]:
                gate_no = gate_idx
        
        return gate_no

    def is_passing_gate(self):
        while True:
            self.color_sensing()