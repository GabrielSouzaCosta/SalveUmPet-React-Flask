import json
from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_object('config')

from models import db
from routes import app

migrate = Migrate(app, db)

