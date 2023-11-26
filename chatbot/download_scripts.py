import requests

def fetch_file_content(download_url):
    response = requests.get(download_url)

    return response.text


def download_repo_content(_URL, path=""):

    "https://github.com/davibenica/BLACKJACK-TEMPLATE"
    shortened = _URL[8:]
    comp_list = shortened.split("/")
    #print("here")
    #print(comp_list)
    owner = comp_list[1]
    repo = comp_list[2]
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
    response = requests.get(url)
    data = response.json()
    #print(data)
    content_list = []
    

    for item in data:
        if item['type'] == 'file':
            file_content = fetch_file_content(item['download_url'])
            content_list.append(f"\nFILE: {item['name']}\n{file_content}\nENDFILE")
        elif item['type'] == 'dir':
            dir_content = download_repo_content(owner, repo, item['path'])
            content_list.append(f"\nDIRECTORY: {item['name']}\n{dir_content}\nENDDIR")


    return ''.join(content_list)

url = "https://github.com/davibenica/BLACKJACK-TEMPLATE"
download_repo_content(url)
