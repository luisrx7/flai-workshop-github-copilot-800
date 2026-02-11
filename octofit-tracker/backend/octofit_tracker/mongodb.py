"""
MongoDB connection and utility functions for OctoFit Tracker
"""
from pymongo import MongoClient
from django.conf import settings
from bson import ObjectId


def get_db():
    """Get MongoDB database connection"""
    mongo_settings = settings.MONGODB_SETTINGS
    client = MongoClient(
        host=mongo_settings['host'],
        port=mongo_settings['port']
    )
    return client[mongo_settings['database']]


def serialize_doc(doc):
    """Convert MongoDB document to JSON-serializable format"""
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_doc(d) for d in doc]
    if isinstance(doc, dict):
        result = {}
        for key, value in doc.items():
            if key == '_id':
                result['id'] = str(value)
            elif isinstance(value, ObjectId):
                result[key] = str(value)
            elif isinstance(value, dict):
                result[key] = serialize_doc(value)
            elif isinstance(value, list):
                result[key] = [serialize_doc(item) if isinstance(item, dict) else item for item in value]
            else:
                result[key] = value
        return result
    return doc


def validate_object_id(oid):
    """Validate if string is a valid ObjectId"""
    try:
        ObjectId(oid)
        return True
    except:
        return False
