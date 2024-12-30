from flask import Blueprint, request, jsonify
from models import FavoritePokemon, User, db
import jwt

favorite_bp = Blueprint('favorites', __name__)
SECRET_KEY = "your_jwt_secret"

# Helper function to get the current user
def get_current_user(token):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return User.query.get(decoded["user_id"])
    except:
        return None

# Get Favorites
@favorite_bp.route('/favorites', methods=['GET'])
def get_favorites():
    token = request.headers.get('Authorization')
    user = get_current_user(token)
    if not user:
        return jsonify({"message": "Unauthorized"}), 401

    favorites = [fav.pokemon_name for fav in user.favorites]
    return jsonify({"favorites": favorites}), 200

# Add Favorite
@favorite_bp.route('/favorites', methods=['POST'])
def add_favorite():
    token = request.headers.get('Authorization')
    user = get_current_user(token)
    if not user:
        return jsonify({"message": "Unauthorized"}), 401

    data = request.get_json()
    pokemon_name = data.get('pokemon_name')
    if not pokemon_name:
        return jsonify({"message": "Pokemon name is required"}), 400

    favorite = FavoritePokemon(pokemon_name=pokemon_name, user_id=user.id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify({"message": "Pokemon added to favorites!"}), 201
