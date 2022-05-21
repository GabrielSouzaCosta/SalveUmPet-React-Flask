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
    interests = []
    user = user_schema.dump(User.query.filter_by(email=get_jwt_identity()).one_or_none())
    image = upload_schema.dump(ProfilePhoto.query.filter_by(owner=user['id']).first())
    favorites = favorites_schema.dump(Favorite.query.filter_by(user_id=user['id']))
    for f in favorites:
        interest = animal_schema.dump(Animal.query.get(f['animal_id']))
        img = upload_schema.dump(Upload.query.filter_by(owner=f['animal_id']).first())
        if img:
            interest['image'] = img['url']  
        interests.append(interest)
    if interests:
        user['interests'] = interests
    if image:
        user['photo'] = image['url']
    for animal in user['animals']:
        img = upload_schema.dump(Upload.query.filter_by(owner=animal['id']).first())
        if img:
            animal['image'] = img['url']
    return jsonify(user)

@app.route('/api/animals/<id>/', methods = ['GET'])
def pet_details(id):
     pet = animal_schema.dump(Animal.query.get(id))
     images = uploads_schema.dump(Upload.query.filter_by(owner=id))
     pet['images'] = images
     return pet

@app.route('/api/animals/cats', methods = ['GET'])
def get_cats():
     cats = Animal.query.filter_by(category="gato")
     results = animals_schema.dump(cats)
     for cat in results:
        cat['image'] = "/assets/images/nophotogato.png"
        img = upload_schema.dump(Upload.query.filter_by(owner=cat['id']).first())
        if img:
            cat['image'] = img['url']
     return jsonify(results)


@app.route('/api/animals/dogs', methods = ['GET'])
def get_dogs():
     dogs = animals_schema.dump(Animal.query.filter_by(category="dog"))
     for dog in dogs:
        dog['image'] = "/assets/images/nophotodog.png"
        img = upload_schema.dump(Upload.query.filter_by(owner=dog['id']).first())
        if img:
            dog['image'] = img['url']
     return jsonify(dogs)

@app.route('/api/add_post', methods = ['POST'])
@jwt_required()
def add_post():
     data = request.json
     user = User.query.filter_by(email=get_jwt_identity()).one_or_none()
     animal = Animal(data['name'], data['category'], data['years'], data['months'], data['details'], data['cute_rating'], data['playful_rating'], data['kind_rating'], owner=user.id)
     animal.add()

     return animal_schema.jsonify(animal)


@app.route('/api/add_interest/', methods = ['POST'])
@jwt_required()
def add_interest():
    user = User.query.filter_by(email=get_jwt_identity()).one_or_none()
    if user.id != request.json['owner']:
        interest = Favorite(animal_id=request.json['id'], user_id=user.id)
        db.session.add(interest)
        db.session.commit()
    else:
        return "User is the owner of the animal"
    
    print(favorites_schema.dump(Favorite.query.filter_by(user_id=user.id)), request.json['owner'])

    return "Animal added to interests list"

@app.route('/api/remove_interest/<id>/', methods = ['DELETE'])
@jwt_required()
def remove_interest(id):
    interest = Favorite.query.filter_by(animal_id=id).all()
    if interest:
        for i in interest:
            db.session.delete(i)
        db.session.commit()

    return jsonify(favorite_schema.dump(interest))

@app.route('/api/update/<id>/', methods = ['PUT', 'POST'])
@jwt_required()
def update_post(id):
    animal = Animal.query.get(id)
    data = request.json
    animal.name, animal.details, animal.years, animal.months = data['name'], data['details'], data['years'], data['months']
    animal.cute_rating, animal.playful_rating, animal.kind_rating= data['cute_rating'], data['playful_rating'], data['kind_rating']
    images = Upload.query.filter_by(owner=id)
    if images:
        for img in images:
            db.session.delete(img)
        db.session.commit()

    db.session.commit()
    return animal_schema.jsonify(animal)

@app.route('/api/delete/<id>/', methods = ['DELETE'])
@jwt_required()
def delete_post(id):
     animal = Animal.query.get(id)
     db.session.delete(animal)
     db.session.commit()

     return animal_schema.jsonify(animal)


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
