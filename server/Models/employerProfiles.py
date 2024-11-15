from app import db

class EmployerProfile(db.Model):
    employer_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), unique=True, nullable=False)
    company_name = db.Column(db.String(100))
    company_email = db.Column(db.String(100))
    profile_pic = db.Column(db.Text)
    what_were_looking_for = db.Column(db.Text)
    verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())  # Timestamp for profile creation

    user = db.relationship('User', backref='employer_profile', uselist=False)  # Linking to User model

    def __repr__(self):
        return f'<EmployerProfile {self.company_name}>'
