from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'team_id', 'role', 'created_at']
    list_filter = ['role', 'team_id', 'created_at']
    search_fields = ['username', 'email']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'team_id', 'created_at']
    search_fields = ['name']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'activity_type', 'duration', 'calories_burned', 'date']
    list_filter = ['activity_type', 'date']
    search_fields = ['user_id', 'activity_type']


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['team_id', 'total_calories', 'total_activities', 'rank', 'last_updated']
    list_filter = ['rank']
    ordering = ['-total_calories']


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['name', 'difficulty', 'category', 'duration', 'calories']
    list_filter = ['difficulty', 'category']
    search_fields = ['name', 'description']
