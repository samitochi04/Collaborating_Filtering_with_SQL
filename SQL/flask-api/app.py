from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Add this import
import os

app = Flask(__name__)
CORS(app)  # Enable CORS
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

@app.route('/recommendations/viewed/<int:item_id>')
def get_recommendations_by_viewed(item_id):
    try:
        # First, let's log that we received the request
        print(f"Received request for item_id: {item_id}")
        
        query = """
        WITH item_sessions AS (
            SELECT DISTINCT session_id 
            FROM sessions 
            WHERE item_id = :item_id
        )
        SELECT p.item_id, COUNT(*) as frequency
        FROM item_sessions is_
        JOIN purchases p ON is_.session_id = p.session_id
        WHERE p.item_id != :item_id
        GROUP BY p.item_id
        ORDER BY frequency DESC
        LIMIT 5;
        """
        
        # Execute query and log results for debugging
        result = db.session.execute(query, {'item_id': item_id})
        recommendations = [{'item_id': row[0], 'frequency': int(row[1])} for row in result]
        print(f"Found recommendations: {recommendations}")
        
        # Also log some data checks
        debug_query = """
        SELECT COUNT(*) FROM sessions WHERE item_id = :item_id;
        """
        debug_result = db.session.execute(debug_query, {'item_id': item_id}).scalar()
        print(f"Number of sessions with item_id {item_id}: {debug_result}")
        
        return jsonify(recommendations)
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/recommendations/purchased/<int:item_id>')
def get_recommendations_by_purchased(item_id):
    try:
        print(f"Received purchase recommendation request for item_id: {item_id}")
        
        # Modified query to cast session_id comparison appropriately
        query = """
        WITH purchase_sessions AS (
            SELECT CAST(session_id AS VARCHAR) as session_id
            FROM purchases
            WHERE item_id = :item_id
        )
        SELECT p2.item_id, COUNT(*) as frequency
        FROM purchase_sessions ps
        JOIN purchases p2 ON ps.session_id = p2.session_id
        WHERE p2.item_id != :item_id
        GROUP BY p2.item_id
        ORDER BY frequency DESC
        LIMIT 5;
        """
        
        result = db.session.execute(query, {'item_id': item_id})
        recommendations = [{'item_id': row[0], 'frequency': int(row[1])} for row in result]
        print(f"Found recommendations: {recommendations}")
        
        return jsonify(recommendations)
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/debug/data')
def debug_data():
    """Debug endpoint to check data in tables"""
    try:
        sessions_count = db.session.execute("SELECT COUNT(*) FROM sessions").scalar()
        purchases_count = db.session.execute("SELECT COUNT(*) FROM purchases").scalar()
        
        # Modified to properly convert results to dictionaries
        sample_sessions = db.session.execute(
            "SELECT session_id, item_id, date FROM sessions LIMIT 5"
        ).fetchall()
        sample_purchases = db.session.execute(
            "SELECT session_id, item_id, date FROM purchases LIMIT 5"
        ).fetchall()
        
        return jsonify({
            'sessions_count': sessions_count,
            'purchases_count': purchases_count,
            'sample_sessions': [
                {'session_id': row[0], 'item_id': row[1], 'date': str(row[2])} 
                for row in sample_sessions
            ],
            'sample_purchases': [
                {'session_id': row[0], 'item_id': row[1], 'date': str(row[2])} 
                for row in sample_purchases
            ]
        })
    except Exception as e:
        print(f"Debug endpoint error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)