from app import db

class AdminAction(db.Model):
    audit_id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)  # Admin who performed the action
    action = db.Column(db.String(255), nullable=False)  # Description of the action (e.g., "Verified Profile")
    target_user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)  # User being acted upon
    action_date = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())  # Timestamp of when the action was performed

    admin = db.relationship('User', foreign_keys=[admin_id], backref='admin_actions')  # The admin user
    target_user = db.relationship('User', foreign_keys=[target_user_id], backref='targeted_by_admin_actions')  # The targeted user

    def __repr__(self):
        return f'<AdminAction {self.action} by Admin {self.admin_id} on User {self.target_user_id}>'
