from flask import Flask, render_template, request, jsonify, send_file
from elevenlabs import generate  # , play
from io import BytesIO

app = Flask(__name__)

@app.route("/")
def hello_world():
	return render_template('index.html')

@app.route('/api/audio', methods=['POST'])
def get_audio():
	if 'text' in request.json:
		text = request.json['text']
		audio = generate(
				text=text,
				voice="Bella",
				model="eleven_monolingual_v1",
		)
		return send_file(audio, mimetype="audio/wav")
	else:
		return jsonify({'error': 'No text provided'})

@app.route('/api/audio/<text>', methods=['GET'])
def get_audio_text(text):
	if text:
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