import certifi
import pymongo
from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://davibenica:H24yzEwwnfcrErTL@teacher-assistant-db.8h8sorj.mongodb.net/"
cluster = MongoClient(uri, tlsCAFile=certifi.where())
db = cluster["TAdb"]
collection = db["Project"]


def add_project_to_db(project_name, completed_repo_url, template_repo_url, project_description="no description"):

    result = collection.find({"project_name": project_name})
    
    
    project = {"type": "project",
              "project_name": project_name,
              "project_description": project_description,
              "completed_repo_url": completed_repo_url,
              "template_repo_url": template_repo_url}
    
    collection.insert_one(project)

    return "Project added to the database"

def get_project_from_db(project_name):
    result = collection.find_one({"project_name": project_name})

    if result:
        return result
    else:
        return "Project not found in the database"
    
def get_all_projects_from_db():
    results = list(collection.find({"type": "project"}))
    #print(results)

    if len(results) == 0:
        return "No projects found in the database"

    list_of_projects = []
    for result in results:
        list_of_projects.append(result)

    if not list_of_projects:
        return "No projects found in the database"
    
    return list_of_projects

def delete_project_from_db(project_name):
    result = collection.delete_one({"project_name": project_name})

    if result.deleted_count == 1:
        return "Project deleted from the database"
    else:
        return "Project not found in the database"
    





    
    




   