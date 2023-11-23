import requests
import json

# The base URL for the Flask server
BASE_URL = 'http://127.0.0.1:8080'


# Use a session object for all requests
session = requests.Session()


def start_chat():
    """Starts a chat session by making a request to the server's /start_chat endpoint."""
    response = session.get(f'{BASE_URL}/start_chat')  # Use session.get instead of requests.get
    if response.status_code == 200:
        print("Chat started:", response.json())
    else:
        print("Failed to start chat:", response.text)


def ask_question(question):
    """Sends a question to the server's /ask endpoint and prints the response."""
    headers = {
        'Content-Type': 'application/json'
    }
    data = {
        'message': question,
        'ta_id': 'asst_X2e5fUMlGtTA1th9pNAKn4k3'
    }
    response = session.post(f'{BASE_URL}/ask', headers=headers, data=json.dumps(data))  # Use session.post instead of requests.post
    
    if response.status_code == 200:
        print("Server response:", response.json())
    else:
        print("Failed to get an answer:", response.text)

def create_chat_bot(name, description, readme_file, file_ids):
    """Creates a new chat bot by making a request to the server's /create_ta endpoint."""
    headers = {
        'Content-Type': 'application/json'
    }
    data = {
        'name': name,
        'project_description': description,
        'readme_file': readme_file,
        'file_ids': file_ids
    }
    response = session.post(f'{BASE_URL}/create_ta', headers=headers, data=json.dumps(data))  # Use session.post instead of requests.post
    
    if response.status_code == 200:
        print("Server response:", response.json())
    else:
        print("Failed to create chat bot:", response.text)


if __name__ == '__main__':
    start_chat()
    
    while True:
        question = input("Enter your question (or type 'exit' to stop): ")
        if question.lower() == 'exit':
            break
        ask_question(question)
