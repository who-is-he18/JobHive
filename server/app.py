from flask import Flask, request, jsonify
from flask_restful import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os
from resources.payment import get_access_token, initiate_payment  # Added initiate_payment import

# Load environment variables from .env file
load_dotenv()

# Set Safaricom API credentials
APP_KEY = os.getenv("SAFARICOM_APP_KEY")
APP_SECRET = os.getenv("SAFARICOM_APP_SECRET")
SHORTCODE = os.getenv("SAFARICOM_SHORTCODE")
SHORTCODE_PASSWORD = os.getenv("SAFARICOM_SHORTCODE_PASSWORD")

# Initialize Flask app
app = Flask(__name__)

# Configuration settings
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')  # Ensure this is set before db.init_app
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')  # JWT Secret Key from .env

# Initialize other extensions
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
api = Api(app)

# Import db from Models and initialize it with app
from Models import db
db.init_app(app)  # Initialize the db object with the app

# Initialize migration tool
migrate = Migrate(app, db)




# Import and register API resources
from resources.user import UserResource, LoginResource
from resources.jobseekerProfile import JobseekerProfileResource
from resources.employerProfile import EmployerProfileResource
from resources.notification import NotificationResource
from resources.adminaction import AdminDeactivateUserResource, AdminViewJobseekersResource, AdminViewEmployersResource


api.add_resource(UserResource, '/users', '/users/<int:id>')
api.add_resource(LoginResource, '/login')
api.add_resource(JobseekerProfileResource, '/jobseekerprofile')
api.add_resource(EmployerProfileResource, '/employerprofile')
api.add_resource(NotificationResource, '/notification')
api.add_resource(AdminDeactivateUserResource, '/admin/deactivate_user/<int:user_id>')
api.add_resource(AdminViewJobseekersResource, '/admin/jobseekers')
api.add_resource(AdminViewEmployersResource, '/admin/employers')

@app.route("/test-token")
def test_token():
    access_token = get_access_token()
    if access_token:
        return f"Access Token: {access_token}"
    else:
        return "Failed to retrieve access token."

# New route for initiating payment
@app.route("/initiate-payment", methods=["POST"])
def initiate_payment_route():
    try:
        # Get amount and phone number from the request body
        amount = request.json.get("amount")
        phone_number = request.json.get("phone_number")
        
        if not amount or not phone_number:
            return jsonify({"error": "Amount and phone number are required"}), 400
        
        # Call the initiate_payment function
        result = initiate_payment(amount, phone_number)
        
        # Return the response to the client
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# New route to handle Safaricom callback
@app.route("/payment/callback", methods=["POST"])
def payment_callback():
    if request.is_json:
        callback_data = request.get_json()

        # Log the data for debugging (remove in production)
        print("Callback received:", callback_data)

        # Extract the relevant fields
        result_code = callback_data.get('Body', {}).get('stkCallback', {}).get('ResultCode')
        result_desc = callback_data.get('Body', {}).get('stkCallback', {}).get('ResultDesc')
        merchant_request_id = callback_data.get('Body', {}).get('stkCallback', {}).get('MerchantRequestID')
        checkout_request_id = callback_data.get('Body', {}).get('stkCallback', {}).get('CheckoutRequestID')

        # Example: If the ResultCode is 0, the payment was successful
        if result_code == 0:
            # Payment was successful, update the database status to 'completed'
            update_payment_status(checkout_request_id, "completed", result_desc)
            print("Payment successful")
        else:
            # Payment failed, update the status to 'failed'
            update_payment_status(checkout_request_id, "failed", result_desc)
            print("Payment failed:", result_desc)

        # Respond to Safaricom with an acknowledgment
        return jsonify({"ResultCode": 0, "ResultDesc": "Received and processed successfully"})
    else:
        return jsonify({"ResultCode": 1, "ResultDesc": "Invalid request"}), 400

def update_payment_status(checkout_request_id, status, description):
    # Find the payment by checkout_request_id (or other identifiers as needed)
    from Models import Payment, db
    payment = Payment.query.filter_by(reference_code=checkout_request_id).first()

    if payment:
        # Update payment status and description
        payment.payment_status = status
        payment.description = description  # Optional field for description
        db.session.commit()
        print("Payment record updated successfully.")
    else:
        print("Payment not found for CheckoutRequestID:", checkout_request_id)



if __name__ == '__main__':
    app.run(debug=True)
