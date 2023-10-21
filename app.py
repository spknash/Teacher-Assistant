from flask import Flask, redirect, url_for, session, render_template_string, request, jsonify
import requests, json
from authlib.integrations.flask_client import OAuth
from utils.githubutils import*
from utils.dp import*
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Initialize OAuth
oauth = OAuth(app)

github = oauth.register(
    name='github',
    client_id='5d0bac8c69368d1a3e70',
    client_secret='69de013a18785ad8b80f60f20910006f65618e00',
    authorize_url='https://github.com/login/oauth/authorize',
    authorize_params=None,
    access_token_url='https://github.com/login/oauth/access_token',
    access_token_params=None,
    redirect_to='github_login',
    client_kwargs={'scope': 'user:email'},
)

@app.route('/')
def index():
    #session.clear()
    return 'Welcome to our Flask app! <a href="/login">Login with GitHub</a>'

@app.route('/login')
def login():
    redirect_uri = url_for('github_login', _external=True)
    print(redirect_uri)
    redirect_uri = "http://127.0.0.1:5000/github/login"

    return github.authorize_redirect(redirect_uri)


@app.route('/github/login')
def github_login():
    try:
        token = github.authorize_access_token()
        resp = github.get('https://api.github.com/user')
        user_info = resp.json()
        session['github_data'] = user_info
        redirect_uri = "http://127.0.0.1:5000/user/home"
        return redirect(redirect_uri)
    except Exception as e:
        print(str(e))
        return "An error occurred during the login process. try again."

@app.route('/user/home')
def user_projects():
    with open('skeletons/user_home.html', 'r') as file:
        html_content = file.read()
    return render_template_string(html_content)
    # return "Logged in. Projects page here"

@app.route('/user/repos')
def user_repos():
    # dynamically create html page to serve
    with open('skeletons/user_repos.html', 'r') as file:
        html_content = file.read()
    return render_template_string(html_content)


@app.route('/user/createrepo')
def user_createrepo():
    # submit data to database on submission of form
    with open('skeletons/create_repo.html', 'r') as file:
        html_content = file.read()
    return render_template_string(html_content)


@app.route('/user/createrepo/submit', methods=['POST'])
def submit():
    data = request.json
    name = data.get('name', 'N/A')  # get the name from the JSON data; default to 'N/A' if not present
    owner = data.get('owner', 'N/A')
    template = data.get('template', 'N/A')
    complete = data.get('complete', 'N/A')
    add_project_to_db(project_name=name, completed_repo_url=complete, template_repo_url=template)
    print("sent to db!")
    

    # add to database here
    print(f"Received name: {name}")
    with open('skeletons/user_repos.html', 'r') as file:
        html_content = file.read()
    return render_template_string(html_content)   

@app.route('/user/repos/<string:repo_name>')
def user_specific_repo(repo_name):
    # display repo specific html page
    # query from database using repo_name
    if repo_name=="example_repo":
        sample_repo = {}
        sample_repo["type"] = "project"
        sample_repo["completed_repo_url"] = "https://github.com/solomonleo12345/BLACKJACK-Game"
        sample_repo["template_repo_url"] =  "https://github.com/davibenica/BLACKJACK-TEMPLATE"
        with open('skeletons/example_repo.html', 'r') as file:
            html_content = file.read()
        return render_template_string(html_content)

    
    return 0

@app.route('/user/repos/<string:repo_name>/talkTA')
def repo_talkTA(repo_name):
    if repo_name=="example_repo":
        sample_repo = {}
        sample_repo["type"] = "project"
        sample_repo["completed_repo_url"] = "https://github.com/solomonleo12345/BLACKJACK-Game"
        sample_repo["template_repo_url"] =  "https://github.com/davibenica/BLACKJACK-TEMPLATE"
        
        print(get_repo_content(sample_repo["template_repo_url"]))
        return "at talkTA"






@app.route('/clear-session')
def clear_session():
    session.clear()
    return "Session cleared!"

if __name__ == '__main__':
    app.run()
