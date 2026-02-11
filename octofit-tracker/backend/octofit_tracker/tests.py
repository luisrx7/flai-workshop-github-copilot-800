from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from datetime import datetime
from .models import User, Team, Activity, Leaderboard, Workout


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='testuser',
            email='test@example.com',
            password='password123',
            team_id=1,
            role='member'
        )

    def test_user_creation(self):
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(self.user.team_id, 1)
        self.assertEqual(str(self.user), 'testuser')


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            team_id=1,
            name='Test Team',
            description='A test team'
        )

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Test Team')
        self.assertEqual(self.team.team_id, 1)
        self.assertEqual(str(self.team), 'Test Team')


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user_id='123456789012345678901234',
            activity_type='Running',
            duration=30,
            calories_burned=300,
            distance=5.0,
            date=datetime.now()
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.calories_burned, 300)


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.leaderboard = Leaderboard.objects.create(
            team_id=1,
            total_calories=5000,
            total_activities=20,
            rank=1
        )

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.team_id, 1)
        self.assertEqual(self.leaderboard.total_calories, 5000)
        self.assertEqual(self.leaderboard.rank, 1)


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Test Workout',
            description='A test workout',
            difficulty='intermediate',
            category='strength',
            duration=45,
            calories=400,
            exercises=[
                {'exercise': 'Push-ups', 'sets': 3, 'reps': 15},
                {'exercise': 'Squats', 'sets': 3, 'reps': 20}
            ]
        )

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Test Workout')
        self.assertEqual(self.workout.difficulty, 'intermediate')
        self.assertEqual(len(self.workout.exercises), 2)


class UserAPITest(APITestCase):
    def test_get_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TeamAPITest(APITestCase):
    def test_get_teams(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ActivityAPITest(APITestCase):
    def test_get_activities(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LeaderboardAPITest(APITestCase):
    def test_get_leaderboard(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class WorkoutAPITest(APITestCase):
    def test_get_workouts(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
