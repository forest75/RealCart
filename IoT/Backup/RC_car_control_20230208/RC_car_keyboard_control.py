import RPi.GPIO as GPIO
import time
from pynput import keyboard
from threading import Thread

# drive 상태
stop  = 0
forward  = 1
backward = 2
left = 3
right = 4
center = 5


# PIN 입출력 설정
output_pin = 1
input_pin = 0

# PIN 설정
high = 1
low = 0

# 실제 핀 정의
# DC PIN
dc_ena = 14  #37 pin
dc_in1 = 15  #37 pin
dc_in2 = 18  #35 pin

# servo PIN
servo_pin = 17

# color sensor PIN
color_s2 = 23
color_s3 = 24
color_signal = 25
color_cycles = 10

# parameters
car_speed  = 0
car_center = 7.75
car_left = 5.5
car_right = 9
car_state = 0 # 0: preparation, 1: ready, 2: goal

# color
color_pink = [2000, 4000, 1000, 3000, 2000, 4000] # red_min, red_max, green_min, green_max, blue_min, blue_max
color_green = [550, 800, 1500, 2000, 800, 1100]

def power_off():
    servo_pwm.stop()
    drive(0)
    GPIO.cleanup()

# Key pressed
def on_press(key):
    global car_speed
    try:       
        print('car speed : ', car_speed)
        
        if (key == key.up):
            car_speed += 10
            drive(car_speed)
            
        if (key == key.down):
            car_speed -= 10
            drive(car_speed)
            
        if (key == key.left):
            steering(left)
             
        if (key == key.right):
            steering(right)
        
        if (key == keyboard.Key.space):
            car_speed = 0
            drive(car_speed)
        
        if (key == keyboard.Key.esc):
            power_off()
        
                
    except AttributeError:     
        print(key)

# DC motor 핀 설정 함수
def set_dc_pin_config():
    # DC motor pin setup
    GPIO.setup(dc_ena, GPIO.OUT)
    GPIO.setup(dc_in1, GPIO.OUT)
    GPIO.setup(dc_in2, GPIO.OUT)
    
    # 100khz 로 PWM 동작 시킴
    pwm = GPIO.PWM(dc_ena, 100)
    
    # 우선 PWM 멈춤.
    pwm.start(0)
    return pwm

# 모터 제어 함수
def set_motor_contorl(dc_pwm, in_A, in_B, speed, stat):
    #모터 속도 제어 PWM
    dc_pwm.ChangeDutyCycle(speed)

    if stat == forward:
        GPIO.output(in_A, high)
        GPIO.output(in_B, low)

    #뒤로
    elif stat == backward:
        GPIO.output(in_A, low)
        GPIO.output(in_B, high)

    #정지
    elif stat == stop:
        GPIO.output(in_A, low)
        GPIO.output(in_B, low)

# 모터 제어함수 간단하게 사용하기 위해 한번더 래핑(감쌈)
def drive(speed):
    if (speed >= 0 and speed <= 100):
        set_motor_contorl(dc_pwm, dc_in1, dc_in2, speed, forward)
        
    elif (speed < 0 and speed >= -100):
        set_motor_contorl(dc_pwm, dc_in1, dc_in2, -speed, backward)
    
    elif (speed == 0):
        set_motor_contorl(dc_pwm, dc_in1, dc_in2, -speed, stop)
    
    else:
        print('car speed max')

def steering(stat):    
    if stat == center:
        servo_pwm.ChangeDutyCycle(car_center)
        time.sleep(0.5)
    
    elif stat == left:
        servo_pwm.ChangeDutyCycle(car_left)
        time.sleep(0.5)
        servo_pwm.ChangeDutyCycle(car_center)        
    
    elif stat == right:
        servo_pwm.ChangeDutyCycle(car_right)
        time.sleep(0.5)
        servo_pwm.ChangeDutyCycle(car_center)  

# color sensing
def color_sensing():
    global car_state
    # Red
    GPIO.output(color_s2, GPIO.LOW)
    GPIO.output(color_s3, GPIO.LOW)
    #time.sleep(0.1)
    
    start = time.time()
    
    for impulse_count in range(color_cycles):
        GPIO.wait_for_edge(color_signal, GPIO.FALLING)
        
    duration = time.time() - start  # seconds to rn for loop
    red = color_cycles / duration
    
    # Blue
    GPIO.output(color_s2, GPIO.LOW)
    GPIO.output(color_s3, GPIO.HIGH)
    #time.sleep(0.1)
    
    start = time.time()
    
    for impulse_count in range(color_cycles):
        GPIO.wait_for_edge(color_signal, GPIO.FALLING)
        
    duration = time.time() - start  # seconds to rn for loop
    blue = color_cycles / duration
    
    # Green
    GPIO.output(color_s2, GPIO.HIGH)
    GPIO.output(color_s3, GPIO.HIGH)
    #time.sleep(0.1)
    
    start = time.time()
    
    for impulse_count in range(color_cycles):
        GPIO.wait_for_edge(color_signal, GPIO.FALLING)
        
    duration = time.time() - start  # seconds to rn for loop
    green = color_cycles / duration
            
    if color_green[0] < red < color_green[1] and color_green[2] < green < color_green[3] and color_green[4] < blue < color_green[5] and car_state == 0:
        print('Ready')
        car_state = 1
    
    elif color_pink[0] < red < color_pink[1] and color_pink[2] < green < color_pink[3] and color_pink[4] < blue < color_pink[5] and car_state == 1:
        print('Goal')
        car_speed = 0
        drive(car_speed)
        car_state = 0   
      
    return car_state

def work():
    with keyboard.Listener(
            on_press=on_press) as listener:
        try:
            listener.join()
        except:
            print('listener except')

def work2():
    while True:
        color_sensing()

def work3():
    global car_speed
    while True:
        car_speed *= 0.8
        drive(car_speed)
        time.sleep(1)
        print('car speed : ', car_speed)


if __name__ == '__main__':
    GPIO.setmode(GPIO.BCM) # GPIO mode setup
    
    # DC_motor pin setup
    dc_pwm = set_dc_pin_config() # motor pin setup

    # servo_motor pin setup
    GPIO.setup(servo_pin, GPIO.OUT)
    servo_pwm = GPIO.PWM(servo_pin, 50)
    servo_pwm.start(car_center)
    
    # color_sensor pin setup
    GPIO.setup(color_signal, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(color_s2, GPIO.OUT)
    GPIO.setup(color_s3, GPIO.OUT)
    
    # Collect events until released        
    try:
        th1 = Thread(target=work)
        th2 = Thread(target=work2)
        th3 = Thread(target=work3)
    
        th1.start()
        th2.start()
        th3.start()
        th1.join()
        th2.join()
        th3.join()

            
    except KeyboardInterrupt:
        power_off()


