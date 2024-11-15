from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from Models import db

class Notification(db.Model,SerializerMixin):
    __tablename__ = 'notifications'

    notification_id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)
    notification_type = db.Column(db.String(50), nullable=False)  # Type of notification: payment, profile update, etc.
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    #foreign key 
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)

    serialize_rules = ('-user.notifications')

    def __repr__(self):
        return f'<Notification {self.notification_type} for user {self.user_id}>'
