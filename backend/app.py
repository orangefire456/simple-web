from flask import Flask
from flask_cors import CORS
from config import config
from routes import api
import os

def create_app(config_name=None):
    """Application factory."""
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Enable CORS
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(api)
    
    @app.route('/health', methods=['GET'])
    def health():
        return {'status': 'healthy'}, 200
    
    return app

if __name__ == '__main__':
    app = create_app()
    print("Starting Restaurant Management API...")
    print("API running at http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
