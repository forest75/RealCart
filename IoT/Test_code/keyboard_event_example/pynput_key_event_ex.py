from pynput import keyboard

def on_press(key):
    try:
        print(f'알파벳 \'{key.char}\' 눌림')
    except AttributeError:
        print(f'특수키 {key} 눌림')

def on_release(key):
    print(f'키보드 {key} 풀림')
    if key == keyboard.Key.esc:
        # esc 키에서 풀림
        return False

# Collect events until released
#  pynput.mouse와 같다
with keyboard.Listener(
        on_press=on_press,
        on_release=on_release) as listener:
    listener.join()

# ...or, in a non-blocking fashion:
listener = keyboard.Listener(
    on_press=on_press,
    on_release=on_release)
listener.start()
