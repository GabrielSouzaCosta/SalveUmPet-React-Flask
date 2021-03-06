from sqlalchemy.ext.hybrid import hybrid_property
from app import app
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_marshmallow import Marshmallow
from app import bcrypt


db = SQLAlchemy(app)
ma = Marshmallow(app)


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    name = db.Column(db.String(80))
    createdAt = db.Column(db.DateTime, default=datetime.now)
    animals = db.relationship('Animal', backref='user', lazy=True)
    files = db.relationship('ProfilePhoto', cascade='all, delete', backref="user", lazy=True)
    favorites = db.relationship('Favorite', cascade='all, delete', backref="user")
    password_hash = db.Column(db.String(128))

    def __init__(self, email, name, password):
        self.email = email
        self.name = name
        self.password_hash = bcrypt.generate_password_hash(password).decode('UTF-8')    

    def check_password_hash(self, password): 
       return bcrypt.check_password_hash(self.password_hash, password)

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
    published_date = db.Column(db.DateTime, default=datetime.now)
    owner = db.Column(db.Integer, db.ForeignKey('user.id'))
    files = db.relationship('Upload', cascade='all, delete', backref="animal", lazy=True)

    def __init__(self, name, category, years, months, details, cute_rating, playful_rating, kind_rating, owner):
        self.name = name
        self.category = category
        self.years = years
        self.months = months
        self.details = details
        self.cute_rating = cute_rating
        self.playful_rating = playful_rating
        self.kind_rating = kind_rating
        self.owner = owner

    def add(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f'{self.category}: {self.name}'
    
class Favorite(db.Model):
    __tablename__ = "favorites"
    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    owner = db.Column(db.Integer, db.ForeignKey("animal.id"))

    def __init__(self, url, owner):
        self.url = url
        self.owner = owner

class ProfilePhoto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    owner = db.Column(db.Integer, db.ForeignKey("user.id"))

    def __init__(self, url, owner):
        self.url = url
        self.owner = owner

# Schemas
class AnimalSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'category', 'years', 'months', 'details', 'cute_rating', 'playful_rating', 'kind_rating', 'published_date', 'owner')

class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
    
    id = ma.auto_field()
    email = ma.auto_field()
    name = ma.auto_field()
    animals = ma.Nested(AnimalSchema, many=True)

class FavoriteSchema(ma.Schema):
    class Meta:
        fields = ('animal_id', 'user_id')

class UploadSchema(ma.Schema):
    class Meta:
        fields = ('id', 'url', 'owner')

animal_schema = AnimalSchema()
animals_schema = AnimalSchema(many=True)

upload_schema = UploadSchema()
uploads_schema = UploadSchema(many=True)

user_schema = UserSchema()
users_schema = UserSchema(many=True)

favorite_schema = FavoriteSchema(many=True)
favorites_schema = FavoriteSchema(many=True)



