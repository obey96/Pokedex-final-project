from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    # Hash the user's password before storing it in the database
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # Verify the user's password during login
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class FavoritePokemon(db.Model):
    __tablename__ = 'favorite_pokemon'
    id = db.Column(db.Integer, primary_key=True)
    pokemon_name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Define a relationship to the User model
    user = db.relationship('User', backref=db.backref('favorites', lazy=True))