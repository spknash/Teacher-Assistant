import requests

def fork_repo(token):

    #token = "YOUR_OAUTH_TOKEN"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }

    owner = "cisco"
    repo = "libest"
    url = f"https://api.github.com/repos/{owner}/{repo}/forks"

    response = requests.post(url, headers=headers)

    if response.status_code == 202:
        print("Forking initiated successfully!")
    else:
        print("Error:", response.content)

def get_repo_content(owner, repo, path=""):
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
    response = requests.get(url)
    data = response.json()

    content_list = []

    for item in data:
        if item['type'] == 'file':
            file_content = fetch_file_content(item['download_url'])
            content_list.append(f"\nFILE: {item['name']}\n{file_content}\nENDFILE")
        elif item['type'] == 'dir':
            dir_content = get_repo_content(owner, repo, item['path'])
            content_list.append(f"\nDIRECTORY: {item['name']}\n{dir_content}\nENDDIR")


    return ''.join(content_list)

def fetch_file_content(download_url):
    response = requests.get(download_url)

    return response.text

owner = "spknash"
repo = "docker_class"
repo_content_string = get_repo_content(owner, repo)
print(repo_content_string)


get_repo_content("spknash", "docker_class")

#The structure starts at the root directory, a file starts with the identifier "FILE:" and a directory starts with
#identifier "DIRECTORY:"
