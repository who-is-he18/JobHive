import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Resource, Api 
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

from Models import db,User, JobseekerProfile, EmployerProfile, Payment, AdminAction, Notification

from resources.user import UserResource,LoginResource

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)


api = Api(app)

bcrypt = Bcrypt(app)

jwt = JWTManager(app)


# Configure database URI using environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking


app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY')
 
migrate = Migrate(app, db)

db.init_app(app)


@app.route('/')
def home():
    return 'Backend is up and running!'

api.add_resource(UserResource,'/users','/users/<id>')
api.add_resource(LoginResource,'/login')

if __name__ == '__main__':
    app.run(debug=True)
