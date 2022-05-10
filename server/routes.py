from flask import Flask, jsonify, redirect, request
from app import app
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, current_user, get_jwt, set_access_cookies
from models import *

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
     category = "cat"
     cats = Animal.query.filter_by(category=category)
     results = animals_schema.dump(cats)
     return jsonify(results)

@app.route('/animals/dogs', methods = ['GET'])
def get_dogs():
     dogs = Animal.query.filter(Animal.category == "dog")
     results = animals_schema.dump(dogs)
     return jsonify(results)
