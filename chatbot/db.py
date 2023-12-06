import certifi
import pymongo
from pymongo.mongo_client import MongoClient



uri = "mongodb+srv://davibenica:H24yzEwwnfcrErTL@teacher-assistant-db.8h8sorj.mongodb.net/?retryWrites=true&w=majority"
cluster = MongoClient(uri, tlsCAFile=certifi.where())

try:
    cluster.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


db = cluster["test"]
collection = db["projects"]






def add_project_to_db(title, completed_repo_url, template_repo_url,language, description, ta_id):

    result = collection.find_one({"completed_repo_url": completed_repo_url})
    if result:
        return "Project already exists in the database"
    
    project = {
        "title":title,
        "completed_repo_url": completed_repo_url,
        "boilerplate_repo_url": template_repo_url,
        "language": language,
        "description": description,
        "ta_id": ta_id
    }
    collection.insert_one(project)
    return "Project added to the database"





    
    




   