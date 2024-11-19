from app import app
from flask_bcrypt import generate_password_hash, Bcrypt
from Models import db
from Models.users import User
from Models.jobseekerProfiles import JobseekerProfile
from Models.employerProfiles import EmployerProfile
from Models.payments import Payment
from Models.notifications import Notification
from Models.adminactions import AdminAction
from datetime import datetime

bcrypt = Bcrypt(app)

def seed_database():
    """Seed the database with essential data"""
    with app.app_context():
        print("Starting database setup...")
        
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        try:
            # Create admin user
            admin = User(
                username="jobhive_admin",
                email="admin@jobhive.com",
                phone="+254712345678",
                password_hash=bcrypt.generate_password_hash("admin_password").decode('utf-8'),
                role="admin",
                is_admin=True,
                is_verified=True,
                created_at=datetime.now()
            )
            db.session.add(admin)
            
            # Create employers and jobseekers
            users = [
                # Employer
                User(
                    username="tech_employer",
                    email="employer@tech.com",
                    phone="+254723456789",
                    password_hash=bcrypt.generate_password_hash("employer_pass").decode('utf-8'), 
                    role="employer",
                    is_verified=True,
                    created_at=datetime.now()
                ),
                # Jobseeker
                User(
                    username="john_dev",
                    email="john@email.com",
                    phone="+254734567890",
                    password_hash=bcrypt.generate_password_hash("seeker_pass").decode('utf-8'), 
                    role="Candidate",
                    is_verified=True,
                    created_at=datetime.now()
                )
            ]
            db.session.add_all(users)
            db.session.commit()

            # Create profiles for jobseekers and employers
            employer_profile = EmployerProfile(
                user_id=users[0].id,
                company_name="Tech Company",
                company_email="jobs@tech.com",
                what_were_looking_for="Looking for Python developers",
                verified=True
            )
            
            jobseeker_profile = JobseekerProfile(
                user_id=users[1].id,
                username="john_dev",
                bio="Python developer",
                job_category="Software Development",
                salary_expectation=80000.00,
                profile_verified=True
            )
            
            db.session.add_all([employer_profile, jobseeker_profile])
            db.session.commit()
            
            print("Database setup completed!")
            print("Admin login - Email: admin@jobhive.com, Password: admin_password")
            
        except Exception as e:
            print(f"Error seeding database: {e}")
            db.session.rollback()
            raise e

if __name__ == "__main__":
    seed_database()
