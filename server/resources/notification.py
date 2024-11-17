from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from Models import Notification, db, User
from flask import jsonify
from utils import send_email_notification, send_push_notification  # Utility functions for notifications

class NotificationResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('message', required=True, help="Notification message is required")
    parser.add_argument('notification_type', required=True, help="Notification type is required")  # Added notification_type as required
    parser.add_argument('email', type=bool, default=False, help="Send via email")
    parser.add_argument('push', type=bool, default=False, help="Send push notification")

    @jwt_required()
    def get(self):
        """Fetches all notifications for the current user"""
        user_id = get_jwt_identity()
        notifications = Notification.query.filter_by(user_id=user_id).all()

        if not notifications:
            return {"message": "No notifications found"}, 404

        return [notification.to_dict() for notification in notifications], 200

    @jwt_required()
    def post(self):
        """Creates a new notification for the current user and optionally sends it via email or push notification"""
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return {"message": "User not found"}, 404

        data = self.parser.parse_args()
        
        # Create the new notification with the required fields
        new_notification = Notification(
            message=data['message'],
            notification_type=data['notification_type'],  # Set the notification_type field
            user_id=user_id
        )

        # Save the notification to the database
        db.session.add(new_notification)
        db.session.commit()

        # Send email notification if requested
        if data['email']:
            email_subject = "New Notification"
            email_body = f"Hello {user.username}, you have a new notification: {data['message']}"
            send_email_notification(user.email, email_subject, email_body)

        # Send push notification if requested and user has a device token
        if data['push'] and user.device_token:
            send_push_notification(user.device_token, "New Notification", data['message'])

        return {
            "message": "Notification created successfully",
            "notification": new_notification.to_dict()
        }, 201

    @jwt_required()
    def delete(self, notification_id):
        """Deletes a specific notification by ID"""
        user_id = get_jwt_identity()
        notification = Notification.query.filter_by(notification_id=notification_id, user_id=user_id).first()

        if not notification:
            return {"message": "Notification not found"}, 404

        # Delete the notification from the database
        db.session.delete(notification)
        db.session.commit()

        return {"message": "Notification deleted successfully"}, 200
