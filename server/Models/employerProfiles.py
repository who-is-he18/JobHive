from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from Models import db

class EmployerProfile(db.Model,SerializerMixin):
    __tablename__ = 'employerprofiles'


    employer_id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100))
    company_email = db.Column(db.String(100))
    profile_pic = db.Column(db.Text)
    what_were_looking_for = db.Column(db.Text)
    verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())  # Timestamp for profile creation
    
    #foreign key
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)

    serialize_rules = ('-user.employerprofiles',)


    def __repr__(self):
        return f'<EmployerProfile {self.company_name}>'
