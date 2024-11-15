from app import db

class JobseekerProfile(db.Model):
    profile_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    profile_pic = db.Column(db.Text)
    bio = db.Column(db.Text)
    job_description = db.Column(db.Text)
    availability = db.Column(db.Boolean, default=True)
    job_category = db.Column(db.String(50))
    salary_expectation = db.Column(db.Numeric(10, 2))
    resume = db.Column(db.Text)
    profile_verified = db.Column(db.Boolean, default=False)  # New field for profile verification
    linkedin = db.Column(db.String(200))  # New field for LinkedIn profile URL
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())  # Updated timestamp

    user = db.relationship('User', backref='jobseeker_profile', uselist=False)  # Linking to User model

    def __repr__(self):
        return f'<JobseekerProfile {self.username}>'
