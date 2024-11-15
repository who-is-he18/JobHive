from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData

# Initialize SQLAlchemy
metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

# Import models to make them accessible via `Models`
from Models.users import User
from Models.adminactions import AdminAction
from Models.employerProfiles import EmployerProfile
from Models.jobseekerProfiles import JobseekerProfile
from Models.notifications import Notification
from Models.payments import Payment
