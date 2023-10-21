from flask import Flask, redirect, url_for, session
from authlib.integrations.flask_client import OAuth

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
        redirect_uri = "http://127.0.0.1:5000/user/projects"
        return redirect(redirect_uri)
    except Exception as e:
        print(str(e))
        return "An error occurred during the login process. try again."
    
@app.route('/user/projects')
def user_projects():
    return "Logged in. Projects page here"



@app.route('/clear-session')
def clear_session():
    session.clear()
    return "Session cleared!"

if __name__ == '__main__':
    app.run()
