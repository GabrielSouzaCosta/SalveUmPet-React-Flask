from email.policy import default
from hmac import compare_digest
from app import app
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_marshmallow import Marshmallow

db = SQLAlchemy(app)
ma = Marshmallow(app)

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    password = db.Column(db.String)
    authenticated = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime, default=datetime.now)

    def __init__(self, email, password):
        self.email = email
        self.password = password

    def check_password(self, input_password):
        return compare_digest(input_password, self.password)

class Animal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.String, nullable=False)
    animalDetails = db.Column(db.Text)
    category = db.Column(db.String, nullable=False)
    publishedDate = db.Column(db.DateTime, nullable=False, default=datetime.now) 

    def __init__(self, name, age, animalDetails, category):
        self.name = name
        self.age = age
        self.animalDetails = animalDetails
        self.category = category

    def add(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f'{self.category}: {self.name}'


class AnimalSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'age', 'animalDetails', 'category', 'publishedDate')

animal_schema = AnimalSchema()
animals_schema = AnimalSchema(many=True)


