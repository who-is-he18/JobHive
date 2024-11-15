from app import db

class Notification(db.Model):
    notification_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    notification_type = db.Column(db.String(50), nullable=False)  # Type of notification: payment, profile update, etc.
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    user = db.relationship('User', backref='notifications', lazy=True)  # Linking to the User model

    def __repr__(self):
        return f'<Notification {self.notification_type} for user {self.user_id}>'
