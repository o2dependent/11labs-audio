from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS
from elevenlabs import generate  # , play
from io import BytesIO

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True, allow_headers=['Content-Type'])

@app.route("/")
def hello_world():
	return render_template('index.html')

@app.route('/api/audio', methods=['POST'])
def get_audio_text():
	if 'text' in request.json:
		text = request.json['text']
		audio = generate(
				text=text,
				voice="Bella",
				model="eleven_monolingual_v1",
		)
		file_obj = BytesIO()
		file_obj.write(audio)
		file_obj.seek(0)
		return send_file(file_obj, mimetype="audio/wav", as_attachment=True, download_name="audio.wav")
	else:
		return jsonify({'error': 'No text provided'})

# @app.after_request
# def after_request(response):
#     header = response.headers
#     header['Access-Control-Allow-Origin'] = '*'
#     # Other headers can be added here if needed
#     return response