from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from Models import db

class User(db.Model,SerializerMixin):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15))
    password_hash = db.Column(db.Text, nullable=False)
    role = db.Column(db.String(20), nullable=False, default='jobseeker')  # jobseeker, employer, admin
    is_admin = db.Column(db.Boolean, default=False)  # distinguish between admins and others
    is_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    # relationships 
    payments = db.relationship('Payment', backref='user', lazy=True)
    employerprofiles = db.relationship('EmployerProfile', backref='user', lazy=True)  # Corrected typo
    jobseekerprofiles = db.relationship('JobseekerProfile', backref='user', lazy=True)  # Linking to User model
    notifications = db.relationship('Notification', backref='user', lazy=True)  # Linking to the User model
    actions_as_admin = db.relationship('AdminAction', 
                                     backref='admin',
                                     lazy=True,
                                     foreign_keys='AdminAction.admin_id')
    
    actions_as_target = db.relationship('AdminAction',
                                      backref='target_user',
                                      lazy=True,
                                      foreign_keys='AdminAction.target_user_id')
    
    serialize_rules = ('-payments.user', 
                      '-employerprofiles.user', 
                      '-jobseekerprofiles.user', 
                      '-notifications.user', 
                      '-actions_as_admin.admin', 
                      '-actions_as_target.target_user')

    def __repr__(self):
        return f'<User {self.username}>'

