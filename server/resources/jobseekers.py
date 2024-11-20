from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from Models import JobseekerProfile, db

from decimal import Decimal

class JobseekersResource(Resource):
    def get(self):
        try:
            jobseekers = JobseekerProfile.query.all()

            jobseeker_profiles = [
                {
                    "profile_id": js.profile_id,
                    "username": js.username,
                    "job_category": js.job_category,
                    "job_description": js.job_description,
                    "profile_pic": js.profile_pic,
                    "bio": js.bio,
                    "availability": js.availability,
                    "salary_expectation": float(js.salary_expectation) if isinstance(js.salary_expectation, Decimal) else js.salary_expectation,
                    "linkedin": js.linkedin,
                }
                for js in jobseekers
            ]
            return {"jobseeker_profiles": jobseeker_profiles}, 200
        except Exception as e:
            return {"error": str(e)}, 500


class ViewJobseekerProfileResource(Resource):
    def get(self, profile_id):
        try:
            # Retrieve the jobseeker profile by profile_id
            jobseeker = JobseekerProfile.query.get_or_404(profile_id)

            # Prepare the response data
            profile_data = {
                "profile_id": jobseeker.profile_id,
                "username": jobseeker.username,
                "job_category": jobseeker.job_category,
                "job_description": jobseeker.job_description,
                "profile_pic": jobseeker.profile_pic,
                "bio": jobseeker.bio,
                "availability": jobseeker.availability,
                "salary_expectation": float(jobseeker.salary_expectation) if isinstance(jobseeker.salary_expectation, Decimal) else jobseeker.salary_expectation,
                "linkedin": jobseeker.linkedin,
            }

            # Return the profile data
            return {"profile_data": profile_data}, 200

        except Exception as e:
            return {"error": str(e)}, 500