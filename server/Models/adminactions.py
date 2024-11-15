from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from Models import db

class AdminAction(db.Model,SerializerMixin):
    __tablename__ = 'adminactions'

    audit_id = db.Column(db.Integer, primary_key=True)
    action = db.Column(db.String(255), nullable=False)  # Description of the action (e.g., "Verified Profile")
    action_date = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())  # Timestamp of when the action was performed

    # Foreign Keys - separate columns for admin and target user
    admin_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    target_user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    
    # serialization rules
    serialize_rules = ('-admin.actions_as_admin', 
                      '-admin.actions_as_target',
                      '-target_user.actions_as_admin',
                      '-target_user.actions_as_target')
    
    
    def __repr__(self):
        return f'<AdminAction {self.action} by Admin {self.admin_id} on User {self.target_user_id}>'
