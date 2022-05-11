from datetime import datetime, timezone, timedelta
from flask import Flask, jsonify, redirect, request
from app import app
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, current_user, set_access_cookies, get_jwt
from models import User, db

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
    user_exists = User.query.filter_by(email=email).one_or_none()
    if user_exists:
        msg = "O usuário já existe."
        return {"msg": msg}, 401

    if len(password) < 8:
        msg = "A senha deve conter pelo menos 8 caracteres."
        return {"msg": msg}, 401

    user = User(email, password)
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