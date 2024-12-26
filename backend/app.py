from flask import Flask, send_from_directory
from flask_cors import CORS
from routes import create_routes

# Initialize Flask app
app = Flask(__name__, static_folder='../build')
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def serve_react():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# Create routes
create_routes(app)

if __name__ == "__main__":
    app.run(debug=True)
