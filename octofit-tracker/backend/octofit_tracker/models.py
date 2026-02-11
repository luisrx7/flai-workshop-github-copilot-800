from djongo import models


class User(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    team_id = models.IntegerField(null=True, blank=True)
    role = models.CharField(max_length=50, default='member')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'users'
        
    def __str__(self):
        return self.username


class Team(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    team_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'teams'
        
    def __str__(self):
        return self.name


class Activity(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    user_id = models.CharField(max_length=24)
    activity_type = models.CharField(max_length=100)
    duration = models.IntegerField()
    calories_burned = models.IntegerField()
    distance = models.FloatField(null=True, blank=True)
    date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'activities'
        
    def __str__(self):
        return f"{self.activity_type} - {self.duration}min"


class Leaderboard(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    team_id = models.IntegerField()
    total_calories = models.IntegerField(default=0)
    total_activities = models.IntegerField(default=0)
    rank = models.IntegerField(null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'leaderboard'
        
    def __str__(self):
        return f"Team {self.team_id} - {self.total_calories} calories"


class Workout(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    difficulty = models.CharField(max_length=50)
    category = models.CharField(max_length=100)
    duration = models.IntegerField()
    calories = models.IntegerField()
    exercises = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'workouts'
        
    def __str__(self):
        return self.name
