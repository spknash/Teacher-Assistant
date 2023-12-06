import requests
import os
import shutil
from ta_chatbot import upload_file

def fetch_file_content(download_url):
    response = requests.get(download_url)

    return response.text


def download_repo_content(_URL, path="", content_list=None, readme_file=""):
    if content_list is None:
        content_list = []

    print("Starting download repo content")
    shortened = _URL[8:]
    comp_list = shortened.split("/")
    owner = comp_list[1]
    repo = comp_list[2]
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"

    response = requests.get(url)
    response.raise_for_status()  # Ensure HTTP request was successful
    data = response.json()

    for item in data:
        if item['type'] == 'file':
            print("FILE:", item['name'])
            file_content = fetch_file_content(item['download_url'])

            if item['name'].lower() == "readme.md":
                readme_file = file_content

            content_list.append(f"\nFILE: {item['name']}\n{file_content}\nENDFILE: {item['name']}\n")

        elif item['type'] == 'dir':
            print("DIRECTORY")
            content_list.append(f"\nDIRECTORY: {item['name']}\n")
            # Recursive call - note how readme_file is passed and received
            content_list, readme_file = download_repo_content(_URL, item['path'], content_list, readme_file)
            content_list.append(f"ENDDIR: {item['name']}\n")

    return content_list, readme_file


def create_file(readme_content, file_content):
    
    with open("README.md", 'w') as f:
        f.write(readme_content)

    with open("repo_content.txt", 'w') as f:
        f.write(''.join(file_content))

    file_ids = []
    file_ids.append(upload_file("README.md"))
    file_ids.append(upload_file("repo_content.txt"))

    os.remove("README.md")
    os.remove("repo_content.txt")

    readme_id = file_ids[0]

    return file_ids, readme_id




    

    
    

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


content = []
readme_file = ""
content, readme_file = download_repo_content("https://github.com/davibenica/BLACKJACK-TEMPLATE")
file_ids, readme_id = create_file(readme_file, content)
print(file_ids)
print(readme_id)


