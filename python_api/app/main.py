# app/main.py
from flask import Flask, jsonify
import os
import time

app = Flask(__name__)


@app.route("/status", methods=["GET"])
def status():
    return jsonify({"status": "Python API is running"}), 200


@app.route("/data", methods=["GET"])
def data():
    return jsonify({"data": "Here is some data from the Python API"}), 200


if __name__ == "__main__":
    # Sleep for a specified interval before starting the app (to simulate the restart)
    time.sleep(int(os.environ.get("RESTART_INTERVAL", 10)))
    app.run(host="0.0.0.0", port=5001)
