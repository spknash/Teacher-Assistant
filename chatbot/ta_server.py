from flask import Flask, request, jsonify, session
import json
from datetime import timedelta
from ta_chatbot import create_teacher_assistant, create_thread, ask_question



app = Flask(__name__)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=1)
app.secret_key = 'your_secret_key'
app.config['SECRET_KEY'] = 'your_secret_key'  
app.config['SESSION_TYPE'] = 'filesystem'
#app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)


app = Flask(__name__)
app.secret_key = 'some_random_string'

@app.route('/start_chat', methods=['GET'])
def start_chat():
    
    # created a new chat thread
    thread_id = create_thread()
    
    # stores the thread in the session
    session['thread_id'] = thread_id
    
    return jsonify({"status": "success", "message": "Chat started!"})

@app.route('/ask', methods=['POST'])
def ask():
    # get the chat thread from the session
    thread_id =session.get('thread_id')
    if not thread_id:
        return jsonify({"status": "failed", "message": "Chat not started!"})
    
    # get the question from the request
    user_message = request.json.get('message', '')

    # Get the ta id from the request
    ta_id = request.json.get('ta_id', '')
    
    # get file ids
    file_ids = request.json.get('file_ids', '')
    
    if len(file_ids) == 0:
        file_ids = []

    # ask the question to the teacher assistant
    answer = ask_question(ta_id, thread_id, user_message, file_ids)
    
    return jsonify({"response": answer})

# API route to create a new teacher assistant
@app.route('/create_ta', methods=['POST'])
def create_ta():

    # get project description and name from the request
    project_description = request.json.get('project_description', '')
    name = request.json.get('name', '')

    # get files from the request
    readme_file = request.json.get('readme_file', '')
    file_ids = request.json.get('file_ids', '')

    # create a new teacher assistant
    ta_id = create_teacher_assistant(file_ids, name, readme_file, project_description)

    if ta_id == None:
        return jsonify({"status": "failed", "message": "Teacher assistant creation failed!"})
    
    return jsonify({"status": "success", "message": "Teacher assistant created!", "ta_id": ta_id})



if __name__ == '__main__':
    app.run(port=8080)
