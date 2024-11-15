from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os
from Models import db,User, JobseekerProfile, EmployerProfile, Payment, AdminAction, Notification

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure database URI using environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking

# Initialize SQLAlchemy and Flask-Migrate
db.init_app(app) 
migrate = Migrate(app, db)


@app.route('/')
def home():
    return 'Backend is up and running!'

if __name__ == '__main__':
    app.run(debug=True)
