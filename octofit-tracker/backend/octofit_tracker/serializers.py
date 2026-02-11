from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'team_id', 'role', 'created_at']
        extra_kwargs = {'password': {'write_only': True}}
    
    def get_id(self, obj):
        return str(obj._id) if obj._id else None


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ['id', 'team_id', 'name', 'description', 'created_at']
    
    def get_id(self, obj):
        return str(obj._id) if obj._id else None


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = Activity
        fields = ['id', 'user_id', 'activity_type', 'duration', 'calories_burned', 
                  'distance', 'date', 'created_at']
    
    def get_id(self, obj):
        return str(obj._id) if obj._id else None


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = Leaderboard
        fields = ['id', 'team_id', 'total_calories', 'total_activities', 'rank', 'last_updated']
    
    def get_id(self, obj):
        return str(obj._id) if obj._id else None


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'difficulty', 'category', 
                  'duration', 'calories', 'exercises', 'created_at']
    
    def get_id(self, obj):
        return str(obj._id) if obj._id else None
