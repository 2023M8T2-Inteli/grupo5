import rclpy
from rclpy.node import Node
from sensor_msgs.msg import BatteryState

class Battery(Node):
    def __init__(self):
        super().__init__('battery_sub')
        self.subscription = self.create_subscription(
            msg_type=BatteryState,
            topic='/battery_state',
            callback=self.percentage_callback,
            qos_profile=10
        )

    def percentage_callback(self, msg):
        self.get_logger().info(f"A bateria está com {msg.battery_state.percentage}")

def main(args=None):
    rclpy.init(args=args)
    bs = Battery()
    rclpy.spin(bs)