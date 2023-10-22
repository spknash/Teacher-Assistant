from flask import Flask, request, jsonify, session
import json
import TeacherAssistant as teach_assist
from langchain.memory import ConversationBufferMemory
from datetime import timedelta



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
    print("starting chat")
    ta = teach_assist.TeacherAssistant([])
    #ta = teach_assist(ConversationBufferMemory(input_key = 'question', memory_key='chat_history', max_len=1000))
    print("ta object initialized")
    session['ta_data'] = ta.get_memory()
    
    print("session data set")
    return jsonify({"status": "success", "message": "Chat started!"})

@app.route('/ask', methods=['POST'])
def ask():
    ta_data = session.get('ta_data')
    print("prev data")
    print(ta_data)
    if not ta_data:
        ta_data = []

    ta = teach_assist.TeacherAssistant(ta_data)  
    
    user_message = request.json.get('message', '')

    # Use the `ta` object to get the answer
    #load_to_context = jsonify({"input": user_message}, {"output": "answer"})
    #print(load_to_context)
    completed_code = request.json.get('complete', '')
    boilerplate = request.json.get('boiler', '')
    answer = ta.query_chain(user_message, completed_code, boilerplate)
    session['ta_data'] = ta.get_memory() 
    session.modified = True
    print(session["ta_data"]) # Save updated data back to the session

    
    return jsonify({"response": answer})

if __name__ == '__main__':
    app.run(port=8080)
