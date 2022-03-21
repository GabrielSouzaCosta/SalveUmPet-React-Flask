import json
from flask import Flask, jsonify, render_template, request
import os
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///animal_adoption"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True


from model import db, Animal, animal_schema, animals_schema

@app.route('/animals', methods = ['GET'])
def get_posts():
    all_animals = Animal.query.all()
    results = animals_schema.dump(all_animals)
    return jsonify(results)

@app.route('/animals/<id>/', methods = ['GET'])
def post_details(id):
     animal = Animal.query.get(id)
     return animal_schema.jsonify(animal)


@app.route('/add_post', methods = ['POST'])
def add_post():
     name = request.json['name']
     age = request.json['age']
     animalDetails = request.json['details']
     category = request.json['category']

     animal = Animal(name, age, animalDetails, category)
     animal.add()

     return animal_schema.jsonify(animal)

@app.route('/update/<id>/', methods = ['PUT'])
def update_post(id):
     animal = Animal.query.get(id)
     update_name = request.json['name']
     update_animalDetails = request.json['details']
     update_age = request.json['age']

     animal.name = update_name
     animal.animalDetails = update_animalDetails
     animal.age = update_age

     db.session.commit()
     return animal_schema.jsonify(animal)

@app.route('/delete/<id>/', methods = ['DELETE'])
def delete_post(id):
     animal = Animal.query.get(id)
     db.session.delete(animal)
     db.session.commit()

     return animal_schema.jsonify(animal)

@app.route('/animals/cats', methods = ['GET'])
def get_cats():
     cats = Animal.query.filter(Animal.category == "gato")
     results = animals_schema.dump(cats)
     return jsonify(results)

@app.route('/animals/dogs', methods = ['GET'])
def get_dogs():
     dogs = Animal.query.filter(Animal.category == "dog")
     results = animals_schema.dump(dogs)
     return jsonify(results)
