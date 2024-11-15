from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from Models import db

class Payment(db.Model,SerializerMixin):
    __tablename__ = 'payments'

    payment_id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Numeric(10, 2), nullable=False)  # Amount paid by the employer
    payment_status = db.Column(db.String(50), nullable=False)  # Payment status (e.g., pending, completed, failed)
    payment_date = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())  # Timestamp of the payment
    reference_code = db.Column(db.String(100), unique=True, nullable=False)  # Unique reference code for the payment
    phone_number = db.Column(db.String(15), nullable=False)  # Phone number associated with the payment

    # foreign key
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)

    serialize_rules = ('-user.payments')


    def __repr__(self):
        return f'<Payment {self.payment_status} by user {self.user_id}>'
