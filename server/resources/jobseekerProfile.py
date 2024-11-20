from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from Models import JobseekerProfile, db
from flask import request



class JobseekerProfileResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', required=True, help='Username is required')
    parser.add_argument('profile_pic', type=str)
    parser.add_argument('bio', type=str)
    parser.add_argument('job_description', type=str)
    parser.add_argument('availability', type=bool)
    parser.add_argument('job_category', type=str)
    parser.add_argument('salary_expectation', type=float)
    parser.add_argument('resume', type=str)
    parser.add_argument('profile_verified', type=bool)
    parser.add_argument('linkedin', type=str)

    
    @jwt_required()
    def get(self):
        """Fetches a jobseeker's profile by profile_id or the current user's profile"""
        profile_id = request.args.get('profile_id')  # Check if 'profile_id' is passed as a query parameter
        user_id = get_jwt_identity()

        if profile_id:  # If a profile_id is provided in the query parameter
            # Fetch the profile by profile_id
            profile = JobseekerProfile.query.filter_by(profile_id=profile_id).first()
            if profile:
                return profile.to_dict(), 200
            return {"message": "Profile not found for the given profile_id"}, 404

        # If no profile_id is provided, fetch the logged-in user's profile
        profile = JobseekerProfile.query.filter_by(user_id=user_id).first()

        if profile:
            return profile.to_dict(), 200
        return {"message": "Profile not found for the current user"}, 404

    @jwt_required()
    def post(self):
        """Creates a new jobseeker profile if it doesn't exist"""
        data = self.parser.parse_args()  # Parse the data from the request
        user_id = get_jwt_identity()  # Get the current logged-in user ID

        # Check if the profile already exists
        if JobseekerProfile.query.filter_by(user_id=user_id).first():
            return {"message": "Profile already exists"}, 400

        # Create a new jobseeker profile
        new_profile = JobseekerProfile(
            user_id=user_id,
            username=data['username'],
            profile_pic=data.get('profile_pic'),
            bio=data.get('bio'),
            job_description=data.get('job_description'),
            availability=data.get('availability', True),
            job_category=data.get('job_category'),
            salary_expectation=data.get('salary_expectation'),
            resume=data.get('resume'),
            profile_verified=False,
            linkedin=data.get('linkedin') 

        )
        # Save the profile to the database
        db.session.add(new_profile)
        db.session.commit()

        return {
            "message": "Profile created successfully",
            "profile": new_profile.to_dict()
        }, 201

    @jwt_required()
    def put(self):
        """Updates the jobseeker profile"""
        user_id = get_jwt_identity()  # Get the current logged-in user ID
        profile = JobseekerProfile.query.filter_by(user_id=user_id).first()

        if not profile:
            return {"message": "Profile not found"}, 404

        data = self.parser.parse_args()  # Parse the data from the request

        # Update the profile with the new data
        for key, value in data.items():
            if value is not None:
                setattr(profile, key, value)

        # Commit the changes to the database
        db.session.commit()

        return {
            "message": "Profile updated successfully",
            "profile": profile.to_dict()
        }, 200

    @jwt_required()
    def delete(self):
        """Deletes the current user's jobseeker profile"""
        user_id = get_jwt_identity()  # Get the current logged-in user ID
        profile = JobseekerProfile.query.filter_by(user_id=user_id).first()

        if not profile:
            return {"message": "Profile not found"}, 404

        # Delete the profile from the database
        db.session.delete(profile)
        db.session.commit()

        return {"message": "Profile deleted successfully"}, 200

    
