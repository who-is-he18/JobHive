from flask_restful import Resource, reqparse
from flask import jsonify, request
from Models import db
from Models.adminactions import AdminAction
from Models.users import User
from flask_jwt_extended import jwt_required, get_jwt_identity

class AdminActionResource(Resource):
    # Parser for input validation
    parser = reqparse.RequestParser()
    parser.add_argument('action', type=str, required=True, help="Action description is required")
    parser.add_argument('target_user_id', type=int, required=True, help="Target user ID is required")
    
    @jwt_required()
    def get(self):
        """
        Get all admin actions.
        Only admins should be able to access this endpoint.
        """
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if not current_user or not current_user.is_admin:
            return {'message': 'Access denied. Admin privileges required.'}, 403
        
        actions = AdminAction.query.all()
        return jsonify([action.serialize() for action in actions])

    @jwt_required()
    def post(self):
        """
        Create a new admin action (e.g., approving files, deactivating users).
        """
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)

        if not current_user or not current_user.is_admin:
            return {'message': 'Access denied. Admin privileges required.'}, 403
        
        data = AdminActionResource.parser.parse_args()
        target_user = User.query.get(data['target_user_id'])
        
        if not target_user:
            return {'message': 'Target user not found.'}, 404
        
        # Create a new admin action
        new_action = AdminAction(
            action=data['action'],
            admin_id=current_user_id,
            target_user_id=data['target_user_id']
        )
        
        db.session.add(new_action)
        db.session.commit()
        
        return {'message': f'Action "{new_action.action}" by Admin {current_user_id} on User {target_user.id} recorded successfully.'}, 201
    
    @jwt_required()
    def put(self):
        """
        Deactivate a user (jobseeker or employer).
        """
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)

        if not current_user or not current_user.is_admin:
            return {'message': 'Access denied. Admin privileges required.'}, 403
        
        data = request.json
        target_user_id = data.get('target_user_id')

        if not target_user_id:
            return {'message': 'Target user ID is required.'}, 400

        target_user = User.query.get(target_user_id)

        if not target_user:
            return {'message': 'Target user not found.'}, 404

        # Deactivate the target user
        target_user.is_verified = False  # Adjust this or add a custom `is_active` flag if needed

        db.session.commit()

        # Log the deactivation action
        new_action = AdminAction(
            action=f'Deactivated User {target_user_id}',
            admin_id=current_user_id,
            target_user_id=target_user_id
        )
        db.session.add(new_action)
        db.session.commit()

        return {'message': f'User {target_user_id} deactivated successfully.'}, 200
