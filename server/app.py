from flask import Flask
from flask_restful import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configuration settings
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')  # Ensure this is set before db.init_app
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')  # JWT Secret Key from .env

# Initialize other extensions
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
api = Api(app)


# Import db from Models and initialize it with app
from Models import db
db.init_app(app)  # Initialize the db object with the app

# Initialize migration tool
migrate = Migrate(app, db)

# Import and register API resources
from resources.user import UserResource, LoginResource
from resources.jobseekerProfile import JobseekerProfileResource
from resources.employerProfile import EmployerProfileResource
from resources.notification import NotificationResource

api.add_resource(UserResource, '/users', '/users/<int:id>')
api.add_resource(LoginResource, '/login')
api.add_resource(JobseekerProfileResource, '/jobseekerprofile')
api.add_resource(EmployerProfileResource, '/employerprofile')
api.add_resource(NotificationResource, '/notification')

if __name__ == '__main__':
    app.run(debug=True)
