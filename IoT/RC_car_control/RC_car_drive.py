import RPi.GPIO as GPIO
import time

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
car_speed = 0

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
        servo_pwm.ChangeDutyCycle(7.5)
        time.sleep(0.5)
    
    elif stat == left:
        servo_pwm.ChangeDutyCycle(5.5)
        time.sleep(0.5)
        servo_pwm.ChangeDutyCycle(7.5)        
    
    elif stat == right:
        servo_pwm.ChangeDutyCycle(9)
        time.sleep(0.5)
        servo_pwm.ChangeDutyCycle(7.5)  

def color_sensing():
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
    
    # end flag
    end_flag = 0
    
    if red > 2000 and blue > 2000 and green > 1000:
        print('Black Pink')
        end_flag = 1
    
    return end_flag
    

def action():
    global car_speed
    
    while True:
        end_flag = color_sensing()
        
        if (end_flag):
            print('Game Over')
        
        cmd = input('Please Enter the command: ')
        cmd = int(cmd)
    
        if cmd == 1:
            car_speed += 10
            drive(car_speed)
    
        elif cmd == 2:
            car_speed -= 10
            drive(car_speed)
    
        elif cmd == 3:
            steering(left)
        elif cmd == 4:
            steering(right)
        elif cmd == 5:
            steering(center)
        elif cmd == 6:
            drive(0)
            GPIO.cleanup()
            exit()
    
        print('car speed : ', car_speed)


if __name__ == '__main__':
    GPIO.setmode(GPIO.BCM) # GPIO mode setup
    
    # DC_motor pin setup
    dc_pwm = set_dc_pin_config() # motor pin setup

    # servo_motor pin setup
    GPIO.setup(servo_pin, GPIO.OUT)
    servo_pwm = GPIO.PWM(servo_pin, 50)
    servo_pwm.start(7.5)
    
    # color_sensor pin setup
    GPIO.setup(color_signal, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(color_s2, GPIO.OUT)
    GPIO.setup(color_s3, GPIO.OUT)
    
    try:
        #action()
        drive(0)
        """
        drive(100)
        while True:
            end_flag = color_sensing()
            if (end_flag):
                drive(0)
                GPIO.cleanup()
                break
        """
    
    except KeyboardInterrupt:
        drive(0)
        GPIO.cleanup()

