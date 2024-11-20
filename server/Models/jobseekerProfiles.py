from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from Models import db

class JobseekerProfile(db.Model,SerializerMixin):
    __tablename__ = 'jobseekerprofiles'


    profile_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    profile_pic = db.Column(db.Text)
    bio = db.Column(db.Text)
    job_description = db.Column(db.Text)
    email = db.Column(db.Text, nullable=True)
    availability = db.Column(db.Boolean, default=True)
    job_category = db.Column(db.String(50))
    salary_expectation = db.Column(db.Numeric(10, 2))
    resume = db.Column(db.Text)
    profile_verified = db.Column(db.Boolean, default=False)  # New field for profile verification
    linkedin = db.Column(db.String(200))  # New field for LinkedIn profile URL
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())  # Updated timestamp

    #foreign key
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)

    serialize_rules = ('-user.jobseekerprofiles',)
   

    def __repr__(self):
        return f'<JobseekerProfile {self.username}>'
