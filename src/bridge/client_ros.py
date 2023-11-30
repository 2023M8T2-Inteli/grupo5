import socketio
from typing import Any
from socketio import Client
import re
import rclpy
from rclpy.node import Node

from std_msgs.msg import String

sio = socketio.Client()
sio.connect("http://0.0.0.0:3000")


class PublishPoints(Node):

    def __init__(self):
        super().__init__('control_robot')
        self.publisher_ = self.create_publisher(String, 'publish_points', 10)

    def timer_callback(self, data):
        msg = String()
        msg.data = data
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)

class ClientSocket:

    def __init__(self, client: Client, socket_event: str):
        self.client = client
        self.client.on(socket_event, self.callback)

        rclpy.init(args=None)
        self.publish_points = PublishPoints()


    def callback(self, msg: Any) -> None:
        print(msg)
        pattern = re.compile(r'\[(-?\d+(\.\d+)?), (-?\d+(\.\d+)?), (-?\d+(\.\d+)?)\]')
        match = pattern.search(msg)
        self.publish_points.timer_callback(match.group())


if __name__ == "__main__":

    socket_instance = ClientSocket(sio, '/enqueue')

    while True:
        pass