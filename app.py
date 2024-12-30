from flask import Flask
from models import db

app = Flask(__name__)

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pokedex.db'  # SQLite for local development
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db.init_app(app)

# Create tables when the app starts (for now; migrations will handle this later)
with app.app_context():
    db.create_all()
