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
    animals = db.relationship('Animal', backref='user', lazy=True)

    def __init__(self, email, password):
        self.email = email
        self.password = password

    def check_password(self, input_password):
        return compare_digest(input_password, self.password)

class Animal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String, nullable=False)
    years = db.Column(db.Integer, default=0)
    months = db.Column(db.Integer, default=0)
    details = db.Column(db.Text)
    cute_rating = db.Column(db.Integer, default=100)
    playful_rating = db.Column(db.Integer, default=100)
    kind_rating = db.Column(db.Integer, default=100)
    publishedDate = db.Column(db.DateTime, default=datetime.now)
    owner = db.Column(db.Integer, db.ForeignKey('user.id'))
    files = db.relationship('Upload', cascade='all, delete', backref="animal", lazy=True)

    def __init__(self, name, category, years, months, details, cute_rating, playful_rating, kind_rating):
        self.name = name
        self.category = category
        self.years = years
        self.months = months
        self.details = details
        self.cute_rating = cute_rating
        self.playful_rating = playful_rating
        self.kind_rating = kind_rating


    def add(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f'{self.category}: {self.name}'

class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(50))
    data = db.Column(db.LargeBinary)
    owner = db.Column(db.Integer, db.ForeignKey("animal.id"))


class AnimalSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'category', 'years', 'months', 'details', 'cute_rating', 'playful_rating', 'kind_rating', 'publishedDate')

animal_schema = AnimalSchema()
animals_schema = AnimalSchema(many=True)


