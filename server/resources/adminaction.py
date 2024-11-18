from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from Models import db
from Models.users import User
from Models.jobseekerProfiles import JobseekerProfile
from Models.employerProfiles import EmployerProfile

# Admin resource to deactivate a user (jobseeker or employer)
class AdminDeactivateUserResource(Resource):
    @jwt_required()  # Ensures that only authenticated users can access this route
    def put(self, user_id):
        # Get the current user's identity (admin)
        current_user_id = get_jwt_identity()  # Get user_id directly
        
        # Fetch the admin user by ID
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'admin':  # Check if the user is an admin
            return {'message': 'Unauthorized access'}, 403
        
        # Fetch the user by ID to deactivate
        user_to_deactivate = User.query.get(user_id)
        if not user_to_deactivate:
            return {'message': 'User not found'}, 404
        
        # Mark the user as deactivated (using `is_verified` as a flag)
        user_to_deactivate.is_verified = False  # Deactivating the user
        db.session.commit()
        return {'message': 'User deactivated successfully'}, 200


# Admin resource to view all jobseekers
class AdminViewJobseekersResource(Resource):
    @jwt_required()  # Ensures that only authenticated users can access this route
    def get(self):
        # Get the current user's identity (admin)
        current_user_id = get_jwt_identity()  # Get user_id directly
        
        # Fetch the admin user by ID
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'admin':  # Check if the user is an admin
            return {'message': 'Unauthorized access'}, 403
        
        # Fetch all users with the role 'jobseeker'
        jobseekers = User.query.filter_by(role='jobseeker').all()
        print("Jobseekers found:", jobseekers)  # Debugging line

        jobseeker_profiles = []
        for jobseeker in jobseekers:
            # Access the profile by the user_id (correct reference)
            profile = JobseekerProfile.query.filter_by(user_id=jobseeker.id).first()  # Change to jobseeker.id
            if profile:
                jobseeker_profiles.append({
                    'username': jobseeker.username,
                    'email': jobseeker.email,
                    'job_category': profile.job_category,
                    'salary_expectation': float(profile.salary_expectation) if profile.salary_expectation else None  # Convert Decimal to float
                })
        
        # Return jobseeker profiles if found
        return {'jobseekers': jobseeker_profiles}, 200


# Admin resource to view all employers
class AdminViewEmployersResource(Resource):
    @jwt_required()  # Ensures that only authenticated users can access this route
    def get(self):
        # Get the current user's identity (admin)
        current_user_id = get_jwt_identity()  # Get user_id directly
        
        # Fetch the admin user by ID
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'admin':  # Check if the user is an admin
            return {'message': 'Unauthorized access'}, 403
        
        # Fetch all users with the role 'employer'
        employers = User.query.filter_by(role='employer').all()
        print("Employers found:", employers)  # Debugging line

        employer_profiles = []
        for employer in employers:
            # Access the profile by the user_id (correct reference)
            profile = EmployerProfile.query.filter_by(user_id=employer.id).first()  # Change to employer.id
            if profile:
                employer_profiles.append({
                    'username': employer.username,
                    'email': employer.email,
                    'company_name': profile.company_name,
                    # Removed 'industry' as it does not exist in the model
                })
        
        # Return employer profiles if found
        return {'employers': employer_profiles}, 200
