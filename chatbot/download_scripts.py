import requests
import os
import shutil

def fetch_file_content(download_url):
    response = requests.get(download_url)

    return response.text


def download_repo_content(_URL, path="", content_list=[]):
    print("starting download repo content")
    print(path)
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
    #content_list = []
    #print(data)

    for item in data:
        if item['type'] == 'file':
            print("FILE: %s", item['name'])
            file_content = fetch_file_content(item['download_url'])
            print(file_content)
            content_list.append(f"\nFILE: {item['name']}\n{file_content}\nENDFILE: {item['name']}\n")
        elif item['type'] == 'dir':
            print("DIRECTORY")
            content_list.append(f"\nDIRECTORY: {item['name']}\n")
            download_repo_content(_URL, item['path'], content_list)
            content_list.append(f"ENDDIR: {item['name']}\n")
            


    
    

def download_zip(_URL):
    shortened = _URL[8:]
    comp_list = shortened.split("/")
    repo = comp_list[2]
    system_command = "git clone " + _URL
    os.system(system_command)
    os.system("cd " + repo)
    os.system("rm -rf " + ".git")
    os.system("cd ..")
    shutil.make_archive(repo, 'zip', repo)
    os.system("rm -rf "+ repo)
    return repo+".zip"

url = "https://github.com/spknash/Bittorrent-mock"
content = []
output = download_repo_content(url, path='', content_list = content)

with open("repo_output.txt", "w") as text_file:
        text_file.write(''.join(content))
