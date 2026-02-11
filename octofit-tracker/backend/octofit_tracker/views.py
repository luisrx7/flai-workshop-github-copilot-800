from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from bson import ObjectId
from datetime import datetime
from .mongodb import get_db, serialize_doc, validate_object_id


class UserViewSet(viewsets.ViewSet):
    """ViewSet for User operations using MongoDB"""
    
    def list(self, request):
        db = get_db()
        users = list(db.users.find())
        return Response(serialize_doc(users))
    
    def retrieve(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        user = db.users.find_one({"_id": ObjectId(pk)})
        if user:
            return Response(serialize_doc(user))
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def create(self, request):
        db = get_db()
        data = request.data.copy()
        data['created_at'] = datetime.utcnow()
        result = db.users.insert_one(data)
        user = db.users.find_one({"_id": result.inserted_id})
        return Response(serialize_doc(user), status=status.HTTP_201_CREATED)
    
    def update(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        db.users.update_one({"_id": ObjectId(pk)}, {"$set": request.data})
        user = db.users.find_one({"_id": ObjectId(pk)})
        if user:
            return Response(serialize_doc(user))
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        result = db.users.delete_one({"_id": ObjectId(pk)})
        if result.deleted_count:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def by_team(self, request):
        team_id = request.query_params.get('team_id')
        if not team_id:
            return Response({"error": "team_id parameter is required"}, 
                          status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        users = list(db.users.find({"team_id": int(team_id)}))
        return Response(serialize_doc(users))


class TeamViewSet(viewsets.ViewSet):
    """ViewSet for Team operations using MongoDB"""
    
    def list(self, request):
        db = get_db()
        teams = list(db.teams.find())
        return Response(serialize_doc(teams))
    
    def retrieve(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        team = db.teams.find_one({"_id": ObjectId(pk)})
        if team:
            return Response(serialize_doc(team))
        return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def create(self, request):
        db = get_db()
        data = request.data.copy()
        data['created_at'] = datetime.utcnow()
        result = db.teams.insert_one(data)
        team = db.teams.find_one({"_id": result.inserted_id})
        return Response(serialize_doc(team), status=status.HTTP_201_CREATED)
    
    def update(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        db.teams.update_one({"_id": ObjectId(pk)}, {"$set": request.data})
        team = db.teams.find_one({"_id": ObjectId(pk)})
        if team:
            return Response(serialize_doc(team))
        return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        result = db.teams.delete_one({"_id": ObjectId(pk)})
        if result.deleted_count:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)


class ActivityViewSet(viewsets.ViewSet):
    """ViewSet for Activity operations using MongoDB"""
    
    def list(self, request):
        db = get_db()
        activities = list(db.activities.find())
        return Response(serialize_doc(activities))
    
    def retrieve(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        activity = db.activities.find_one({"_id": ObjectId(pk)})
        if activity:
            return Response(serialize_doc(activity))
        return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def create(self, request):
        db = get_db()
        data = request.data.copy()
        data['created_at'] = datetime.utcnow()
        result = db.activities.insert_one(data)
        activity = db.activities.find_one({"_id": result.inserted_id})
        return Response(serialize_doc(activity), status=status.HTTP_201_CREATED)
    
    def update(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        db.activities.update_one({"_id": ObjectId(pk)}, {"$set": request.data})
        activity = db.activities.find_one({"_id": ObjectId(pk)})
        if activity:
            return Response(serialize_doc(activity))
        return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        result = db.activities.delete_one({"_id": ObjectId(pk)})
        if result.deleted_count:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def by_user(self, request):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({"error": "user_id parameter is required"}, 
                          status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        activities = list(db.activities.find({"user_id": user_id}))
        return Response(serialize_doc(activities))


class LeaderboardViewSet(viewsets.ViewSet):
    """ViewSet for Leaderboard operations using MongoDB"""
    
    def list(self, request):
        db = get_db()
        leaderboard = list(db.leaderboard.find().sort("total_calories", -1))
        return Response(serialize_doc(leaderboard))
    
    def retrieve(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        entry = db.leaderboard.find_one({"_id": ObjectId(pk)})
        if entry:
            return Response(serialize_doc(entry))
        return Response({"error": "Leaderboard entry not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def create(self, request):
        db = get_db()
        data = request.data.copy()
        data['last_updated'] = datetime.utcnow()
        result = db.leaderboard.insert_one(data)
        entry = db.leaderboard.find_one({"_id": result.inserted_id})
        return Response(serialize_doc(entry), status=status.HTTP_201_CREATED)
    
    def update(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        data = request.data.copy()
        data['last_updated'] = datetime.utcnow()
        db.leaderboard.update_one({"_id": ObjectId(pk)}, {"$set": data})
        entry = db.leaderboard.find_one({"_id": ObjectId(pk)})
        if entry:
            return Response(serialize_doc(entry))
        return Response({"error": "Leaderboard entry not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        result = db.leaderboard.delete_one({"_id": ObjectId(pk)})
        if result.deleted_count:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Leaderboard entry not found"}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def top_teams(self, request):
        limit = int(request.query_params.get('limit', 10))
        db = get_db()
        top_teams = list(db.leaderboard.find().sort("total_calories", -1).limit(limit))
        return Response(serialize_doc(top_teams))


class WorkoutViewSet(viewsets.ViewSet):
    """ViewSet for Workout operations using MongoDB"""
    
    def list(self, request):
        db = get_db()
        workouts = list(db.workouts.find())
        return Response(serialize_doc(workouts))
    
    def retrieve(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        workout = db.workouts.find_one({"_id": ObjectId(pk)})
        if workout:
            return Response(serialize_doc(workout))
        return Response({"error": "Workout not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def create(self, request):
        db = get_db()
        data = request.data.copy()
        data['created_at'] = datetime.utcnow()
        result = db.workouts.insert_one(data)
        workout = db.workouts.find_one({"_id": result.inserted_id})
        return Response(serialize_doc(workout), status=status.HTTP_201_CREATED)
    
    def update(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        db.workouts.update_one({"_id": ObjectId(pk)}, {"$set": request.data})
        workout = db.workouts.find_one({"_id": ObjectId(pk)})
        if workout:
            return Response(serialize_doc(workout))
        return Response({"error": "Workout not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, pk=None):
        if not validate_object_id(pk):
            return Response({"error": "Invalid ID"}, status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        result = db.workouts.delete_one({"_id": ObjectId(pk)})
        if result.deleted_count:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Workout not found"}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def by_difficulty(self, request):
        difficulty = request.query_params.get('difficulty')
        if not difficulty:
            return Response({"error": "difficulty parameter is required"}, 
                          status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        workouts = list(db.workouts.find({"difficulty": difficulty}))
        return Response(serialize_doc(workouts))
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category = request.query_params.get('category')
        if not category:
            return Response({"error": "category parameter is required"}, 
                          status=status.HTTP_400_BAD_REQUEST)
        db = get_db()
        workouts = list(db.workouts.find({"category": category}))
        return Response(serialize_doc(workouts))
