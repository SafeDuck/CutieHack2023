import serial
from evdev import UInput, AbsInfo, ecodes as e

# Set the correct serial port
ser = serial.Serial('/dev/ttyACM0', 9600)

# Set up the virtual joystick
ui = UInput({
    e.EV_KEY:
        [e.BTN_THUMB, e.BTN_THUMB2],
    e.EV_ABS:
        [
            # joystick 1
            (e.ABS_X, AbsInfo(value=128, min=0, max=255, fuzz=0, flat=0, resolution=0)),
            (e.ABS_Y, AbsInfo(value=128, min=0, max=255, fuzz=0, flat=0, resolution=0)),
            # joystick 2
            (e.ABS_RX, AbsInfo(value=128, min=0, max=255, fuzz=0, flat=0, resolution=0)),
            (e.ABS_RY, AbsInfo(value=128, min=0, max=255, fuzz=0, flat=0, resolution=0))
        ]
}, name="virtual-joystick")

while True:
    try:
        data = ser.readline().decode().strip().split(',')
        if len(data) == 6:
            x_value, y_value = map(int, data[:2])
            x_value2, y_value2 = map(int, data[2:4])
            a, b = map(bool, map(int, data[4:]))

            # Map and scale X and Y values to joystick range (e.g., 0-255)
            mapped_x = int((x_value / 1023.0) * 255)
            mapped_y = int((y_value / 1023.0) * 255)

            mapped_x2 = int((x_value2 / 1023.0) * 255)
            mapped_y2 = int((y_value2 / 1023.0) * 255)

            print("X: {}, Y: {}, X2: {}, Y2: {}, A: {}, B: {}".format(mapped_x, mapped_y, mapped_x2, mapped_y2, a, b))

            # Emit the events to the virtual joystick
            ui.write(e.EV_ABS, e.ABS_X, mapped_x)
            ui.write(e.EV_ABS, e.ABS_Y, mapped_y)

            ui.write(e.EV_ABS, e.ABS_RX, mapped_x2)
            ui.write(e.EV_ABS, e.ABS_RY, mapped_y2)

            ui.write(e.EV_KEY, e.BTN_THUMB, a)
            ui.write(e.EV_KEY, e.BTN_THUMB2, b)

            ui.syn()

    except ValueError:
        pass  # Handle invalid data if necessary
