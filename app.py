from flask import Flask, jsonify, send_from_directory, render_template
import os

app = Flask(__name__)

IMAGES_FOLDER = 'static/popup-images'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/images-list')
def images_list():
    valid_ext = ('.png', '.jpg', '.jpeg', '.gif')
    files = [f for f in os.listdir(IMAGES_FOLDER) if f.lower().endswith(valid_ext)]
    files = [f'/static/popup-images/{f}' for f in files]
    return jsonify(files)

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)
