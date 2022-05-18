from datetime import datetime, timezone, timedelta
import email
from werkzeug.utils import secure_filename
from flask import Flask, jsonify, redirect, request
from app import app, s3, upload_file_to_s3
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, current_user, set_access_cookies, get_jwt
from models import *

jwt = JWTManager(app)

msg = ""

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(email=identity).one_or_none()   

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route('/api/register', methods=['POST'])
def register():
    email = request.json.get('email')
    password = request.json.get('password')
    name = request.json.get('name')
    user_exists = User.query.filter_by(email=email).one_or_none()
    if user_exists:
        msg = "O usuário já existe."
        return {"msg": msg}, 401

    if len(password) < 8:
        msg = "A senha deve conter pelo menos 8 caracteres."
        return {"msg": msg}, 401

    user = User(email, name, password)
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=email)

    return jsonify(access_token=access_token), 200

@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(email=email).one_or_none()
    if not user or not user.check_password(password):
        msg = "Email ou senha incorreto"
        return {"msg": msg}, 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def profile():
    user = user_schema.dump(User.query.filter_by(email=get_jwt_identity()).one_or_none())
    image = upload_schema.dump(ProfilePhoto.query.filter_by(owner=user['id']).first())
    if image:
        user['photo'] = image['url']
    return jsonify(user)

@app.route('/api/add_post', methods = ['POST'])
@jwt_required()
def add_post():
     name = request.json['name']
     category = request.json['category']
     years = request.json['years']
     months = request.json['months']
     details = request.json['details']
     cute_rating = request.json['cute_rating']
     playful_rating = request.json['playful_rating']
     kind_rating = request.json['kind_rating']
     owner = User.query.filter_by(email=get_jwt_identity()).one_or_none()
     animal = Animal(name, category, years, months, details, cute_rating, playful_rating, kind_rating, owner=owner.id)
     animal.add()

     return animal_schema.jsonify(animal)

@app.route('/api/animals', methods = ['GET'])
def get_posts():
    all_animals = Animal.query.all()
    results = animals_schema.dump(all_animals)
    return jsonify(results)

@app.route('/api/animals/cats', methods = ['GET'])
def get_cats():
     category = "gato"
     cats = Animal.query.filter_by(category=category)
     results = animals_schema.dump(cats)
     for cat in results:
        cat['image'] = "/assets/images/nophoto.png"
        img = upload_schema.dump(Upload.query.filter_by(owner=cat['id']).first())
        if img:
            cat['image'] = img['url']
     return jsonify(results)

@app.route('/api/animals/cats/<id>/', methods = ['GET'])
def cat_details(id):
     animal = animal_schema.dump(Animal.query.get(id))
     images = uploads_schema.dump(Upload.query.filter_by(owner=id))
     animal['images'] = images

     return animal

@app.route('/api/animals/dogs', methods = ['GET'])
def get_dogs():
     dogs = Animal.query.filter(Animal.category == "dog")
     results = animals_schema.dump(dogs)
     return jsonify(results)

@app.route('/api/upload_image/<id>', methods = ['POST'])
@jwt_required()
def upload_image(id):
    try:
        files = request.files.getlist("file")

    except Exception as e:
        return "sem imagens"

    else: 
        if files:
            if len(files) == 1:
                files[0].filename = secure_filename(files[0].filename)
                output = upload_file_to_s3(files[0], app.config["S3_BUCKET"])
                upload = Upload(url=output, owner=id)
                db.session.add(upload)
                db.session.commit()
            else:
                for f in files:
                    f.filename = secure_filename(f.filename)
                    output = upload_file_to_s3(f, app.config["S3_BUCKET"])
                    upload = Upload(url=output, owner=id)
                    db.session.add(upload)
                    db.session.commit()
            return str(output)

    try:
        prof_photo = request.files['profile_photo']

    except Exception as e:
            return "sem imagens"

    else:
        if prof_photo:
            prof_photo.filename = secure_filename(prof_photo.filename)
            output = upload_file_to_s3(prof_photo, app.config["S3_BUCKET"])
            users_images = ProfilePhoto.query.filter_by(owner=id)
            if users_images:
                for img in users_images:
                    db.session.delete(img)
                db.session.commit()
            upload = ProfilePhoto(url=output, owner=id)
            db.session.add(upload)
            db.session.commit()
            images = uploads_schema.dump(ProfilePhoto.query.filter_by(owner=id))
            return str(output)

        

@app.route('/api/update/<id>/', methods = ['PUT'])
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

@app.route('/api/delete/<id>/', methods = ['DELETE'])
def delete_post(id):
     animal = Animal.query.get(id)
     db.session.delete(animal)
     db.session.commit()

     return animal_schema.jsonify(animal)
