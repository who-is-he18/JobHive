from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from Models import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15))
    password_hash = db.Column(db.Text, nullable=False)
    role = db.Column(db.String(20), nullable=False, default='jobseeker')
    is_verified = db.Column(db.Boolean, default=False)
    is_admin = db.Column(db.Boolean, default=False)  # distinguish between admins and others
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    device_token = db.Column(db.String(255), nullable=True)  



    # relationships 
    payments = db.relationship('Payment', backref='user', lazy=True)
    employerprofiles = db.relationship('EmployerProfile', backref='user', lazy=True)
    jobseekerprofiles = db.relationship('JobseekerProfile', backref='user', lazy=True)
    notifications = db.relationship('Notification', backref='user', lazy=True, cascade="all, delete-orphan")  # Cascade delete
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
