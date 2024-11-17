import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import requests

# Configuration for email (using environment variables)
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
EMAIL_USERNAME = os.getenv('EMAIL_USERNAME')  # The environment variable for the sender email
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')  # The environment variable for the sender email password

def send_email_notification(to_email, subject, body):
    """Send an email notification"""
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USERNAME
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        # Connect to the server and send the email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Secure the connection
            server.login(EMAIL_USERNAME, EMAIL_PASSWORD)
            server.send_message(msg)

        print("Email sent successfully.")
    except Exception as e:
        print(f"Failed to send email: {e}")

# Function for sending push notifications using FCM (Firebase Cloud Messaging)
FCM_SERVER_KEY = os.getenv('FCM_SERVER_KEY')  # Firebase Cloud Messaging server key (environment variable)

def send_push_notification(device_token, title, message):
    """Send a push notification"""
    try:
        headers = {
            'Authorization': f'key={FCM_SERVER_KEY}',
            'Content-Type': 'application/json'
        }
        payload = {
            'to': device_token,
            'notification': {
                'title': title,
                'body': message
            }
        }

        response = requests.post('https://fcm.googleapis.com/fcm/send', json=payload, headers=headers)
        response.raise_for_status()  # Raise an error for bad status codes

        print("Push notification sent successfully.")
    except Exception as e:
        print(f"Failed to send push notification: {e}")
