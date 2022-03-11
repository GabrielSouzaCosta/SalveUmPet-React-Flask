from distutils.log import debug
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    render_template('index.js')


if __name__ == "__main__":
    app.run(debug=True)