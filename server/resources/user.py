from flask import jsonify, request
from flask_restful import Resource, reqparse
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, JWTManager,jwt_required,get_jwt_identity


from Models import User, db

class UserResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', required=False, help='Name is required')
    parser.add_argument('phone', required=False, help='Phone Number is required')
    parser.add_argument('email', required=False, help='Email is required')
    parser.add_argument('password_hash', required=False, help='Password is required')
    parser.add_argument('role', required=False, help='Role is required')
    parser.add_argument('is_admin', type=bool, required=False, help='Admin status')
    parser.add_argument('is_verified', type=bool, required=False, help='Verification status')

    def get(self, id=None):
        if id:
            user = User.query.get(id)
            if user:
                return user.to_dict(), 200
            return {"message": "User not found"}, 404
        else:
            users = User.query.all()
            return [user.to_dict() for user in users], 200

    def post(self):
        data = self.parser.parse_args()
        print(data)

        # 1. Verify phone is unique
        email = User.query.filter_by(email=data['email']).first()
        if email:
            return {"message": "Email already exists"}, 422

        # 2. Encrypt the password
        hash = generate_password_hash(data['password_hash']).decode('utf-8')

        is_verified = bool(data['is_verified'])
        is_admin = data.get('is_admin', False) or False

        # 3. Save the user to the db
        user = User(
            username=data['username'],
            phone=data['phone'],
            password_hash=hash,
            email=data['email'],
            role=data['role'],
            is_admin=is_admin,
            is_verified=is_verified
        )

        db.session.add(user)
        db.session.commit()

        # 4. Generate JWT and send it back
        access_token = create_access_token(identity=user.id)

        return {
            "message": "User created successfully",
            "user": user.to_dict(),
            "access_token": access_token
        }

    def put(self, id):
        # Parse incoming data for update
        data = self.parser.parse_args()

        # Find the user by ID
        user = User.query.get(id)
        if not user:
            return {"message": "User not found"}, 404

        # Update user attributes only if new data is provided
        if data['username']:
            user.username = data['username']
        if data['phone']:
            user.phone = data['phone']
        if data['email']:
            user.email = data['email']
        if data['password_hash']:
            user.password_hash = generate_password_hash(data['password_hash']).decode('utf-8')
        if data['role']:
            user.role = data['role']
        if data['is_admin'] is not None:
            user.is_admin = data['is_admin']
        if data['is_verified'] is not None:
            user.is_verified = data['is_verified']

        # Commit the changes to the database
        db.session.commit()

        # Return the updated user data
        return {
            "message": "User updated successfully",
            "user": user.to_dict()
        }, 200
    
    def delete(self, id):
        # Find the user by ID
        user = User.query.get(id)
        if not user:
            return {"message": "User not found"}, 404

        # Delete the user
        db.session.delete(user)
        db.session.commit()

        return {
            "message": f"User with ID {id} has been deleted successfully"
        }, 200
class LoginResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('email', required=True, help="Email is required")
    parser.add_argument('password_hash', required=True, help="Password is required")

    def post(self):
        # Parse the incoming JSON data
        data = self.parser.parse_args()

        # 1. Retrieve the user using the unique field
        user = User.query.filter_by(email=data['email']).first()

        # If user does not exist, return an error message
        if user is None:
            return {
                "message": "Invalid email or password"
            }, 401

        # If password matches, generate JWT
        if check_password_hash(user.password_hash, data['password_hash']):
            access_token = create_access_token(identity=user.id)
            return {
                "message": "Login successful",
                "user": user.to_dict(),
                "is_admin": user.is_admin,
                "access_token": access_token
            }, 200
        else:
            return {
                "message": "Invalid email or password"
            }, 401