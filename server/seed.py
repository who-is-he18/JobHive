from app import app
from Models import db, User, JobseekerProfile, EmployerProfile, Payment, Notification, AdminAction
from datetime import datetime

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
                password_hash="admin_password",  # Will be hashed properly
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
                    password_hash="employer_pass",
                    role="employer",
                    is_verified=True,
                    created_at=datetime.now()
                ),
                # Jobseeker
                User(
                    username="john_dev",
                    email="john@email.com",
                    phone="+254734567890",
                    password_hash="seeker_pass",
                    role="jobseeker",
                    is_verified=True,
                    created_at=datetime.now()
                )
            ]
            db.session.add_all(users)
            db.session.commit()

            # Create profiles
            employer_profile = EmployerProfile(
                user_id=users[0].user_id,
                company_name="Tech Company",
                company_email="jobs@tech.com",
                what_were_looking_for="Looking for Python developers",
                verified=True
            )
            
            jobseeker_profile = JobseekerProfile(
                user_id=users[1].user_id,
                username="john_dev",
                bio="Python developer",
                job_category="Software Development",
                salary_expectation=80000.00,
                profile_verified=True
            )
            
            db.session.add_all([employer_profile, jobseeker_profile])
            
            # Create a payment
            payment = Payment(
                user_id=users[0].user_id,
                amount=1000.00,
                payment_status="completed",
                reference_code="PAY" + datetime.now().strftime("%Y%m%d%H%M%S"),
                phone_number="+254723456789"
            )
            db.session.add(payment)
            
            # Create notifications
            notifications = [
                Notification(
                    user_id=users[0].user_id,
                    message="Payment processed successfully",
                    notification_type="payment",
                    is_read=False,
                    created_at=datetime.now()
                ),
                Notification(
                    user_id=users[1].user_id,
                    message="Profile verified successfully",
                    notification_type="profile_update",
                    is_read=False,
                    created_at=datetime.now()
                )
            ]
            db.session.add_all(notifications)
            
            # Create admin action
            admin_action = AdminAction(
                admin_id=admin.user_id,
                target_user_id=users[1].user_id,
                action="Verified jobseeker profile",
                action_date=datetime.now(),
            )
            db.session.add(admin_action)
            
            db.session.commit()
            print("Database setup completed!")
            print("Admin login - Email: admin@jobhive.com, Password: admin_password")
            
        except Exception as e:
            print(f"Error seeding database: {e}")
            db.session.rollback()
            raise e

if __name__ == "__main__":
    seed_database()