import certifi
import pymongo
from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://davi:davi@cluster0.yftsyap.mongodb.net/?retryWrites=true&w=majority"
cluster = MongoClient(uri, tlsCAFile=certifi.where())
db = cluster["TAdb"]
collection = db["TAdb"]

for collection_name in db.list_collection_names():
    db[collection_name].drop()