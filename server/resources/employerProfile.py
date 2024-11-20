from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from Models import EmployerProfile, db

class EmployerProfileResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('company_name', type=str)
    parser.add_argument('company_email', type=str)
    parser.add_argument('profile_pic', type=str)
    parser.add_argument('what_were_looking_for', type=str)
    # parser.add_argument('verified', type=bool)

    @jwt_required()
    def get(self):
        """Fetches the current user's employer profile"""
        user_id = get_jwt_identity()  # Get the current logged-in user ID
        profile = EmployerProfile.query.filter_by(user_id=user_id).first()

        if profile:
            return {
                'employer_id': profile.employer_id,  # Changed from 'id' to 'employer_id'
                'user_id': profile.user_id,
                'company_name': profile.company_name,
                'company_email': profile.company_email,
                'profile_pic': profile.profile_pic,
                'what_were_looking_for': profile.what_were_looking_for,
                # 'verified': profile.verified
            }, 200
        return {"message": "Profile not found"}, 404

    @jwt_required()
    def post(self):
        """Creates a new employer profile if it doesn't exist"""
        data = self.parser.parse_args()  # Parse the data from the request
        user_id = get_jwt_identity()  # Get the current logged-in user ID

        # Check if the profile already exists
        if EmployerProfile.query.filter_by(user_id=user_id).first():
            return {"message": "Profile already exists"}, 400

        # Create a new employer profile
        new_profile = EmployerProfile(
            user_id=user_id,
            company_name=data['company_name'],
            company_email=data.get('company_email'),
            profile_pic=data.get('profile_pic'),
            what_were_looking_for=data.get('what_were_looking_for'),
            # verified=data.get('verified', False)  # default to False if not provided
        )

        # Save the profile to the database
        db.session.add(new_profile)
        db.session.commit()

        return {
            "message": "Profile created successfully",
            "profile": {
                'employer_id': new_profile.employer_id,  # Changed from 'id' to 'employer_id'
                'user_id': new_profile.user_id,
                'company_name': new_profile.company_name,
                'company_email': new_profile.company_email,
                'profile_pic': new_profile.profile_pic,
                'what_were_looking_for': new_profile.what_were_looking_for,
                # 'verified': new_profile.verified
            }
        }, 201

    @jwt_required()
    def put(self):
        """Updates the employer profile"""
        user_id = get_jwt_identity()  # Get the current logged-in user ID
        profile = EmployerProfile.query.filter_by(user_id=user_id).first()

        if not profile:
            return {"message": "Profile not found"}, 404

        # Parse the data from the request
        data = self.parser.parse_args()

        # Only update fields that are provided in the request
        for key, value in data.items():
            if value is not None:  # Ignore `None` values
                setattr(profile, key, value)

        try:
            # Commit the changes to the database
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"message": "Failed to update profile", "error": str(e)}, 500

        return {
            "message": "Profile updated successfully",
            "profile": {
                'employer_id': profile.employer_id,  # Changed from 'id' to 'employer_id'
                'user_id': profile.user_id,
                'company_name': profile.company_name,
                'company_email': profile.company_email,
                'profile_pic': profile.profile_pic,
                'what_were_looking_for': profile.what_were_looking_for,
                # 'verified': profile.verified
            }
        }, 200

    @jwt_required()
    def delete(self):
        """Deletes the current user's employer profile"""
        user_id = get_jwt_identity()  # Get the current logged-in user ID
        profile = EmployerProfile.query.filter_by(user_id=user_id).first()

        if not profile:
            return {"message": "Profile not found"}, 404

        # Delete the profile from the database
        db.session.delete(profile)
        db.session.commit()

        return {"message": "Profile deleted successfully"}, 200
