from django.core.management.base import BaseCommand
from pymongo import MongoClient
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Connect to MongoDB
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        self.stdout.write(self.style.SUCCESS('Starting database population...'))

        # Clear existing data
        self.stdout.write('Clearing existing collections...')
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Create unique index on email field
        db.users.create_index([('email', 1)], unique=True)
        self.stdout.write(self.style.SUCCESS('Created unique index on email field'))

        # Create Teams
        teams_data = [
            {
                '_id': 1,
                'name': 'Team Marvel',
                'description': 'Earth\'s Mightiest Heroes',
                'created_at': datetime.now()
            },
            {
                '_id': 2,
                'name': 'Team DC',
                'description': 'Justice League United',
                'created_at': datetime.now()
            }
        ]
        db.teams.insert_many(teams_data)
        self.stdout.write(self.style.SUCCESS(f'Created {len(teams_data)} teams'))

        # Create Users (Superheroes)
        marvel_heroes = [
            {'name': 'Tony Stark', 'email': 'ironman@marvel.com', 'alias': 'Iron Man', 'power': 'Technology'},
            {'name': 'Steve Rogers', 'email': 'captainamerica@marvel.com', 'alias': 'Captain America', 'power': 'Super Soldier'},
            {'name': 'Thor Odinson', 'email': 'thor@marvel.com', 'alias': 'Thor', 'power': 'God of Thunder'},
            {'name': 'Natasha Romanoff', 'email': 'blackwidow@marvel.com', 'alias': 'Black Widow', 'power': 'Spy Master'},
            {'name': 'Bruce Banner', 'email': 'hulk@marvel.com', 'alias': 'Hulk', 'power': 'Super Strength'},
        ]

        dc_heroes = [
            {'name': 'Clark Kent', 'email': 'superman@dc.com', 'alias': 'Superman', 'power': 'Flight & Super Strength'},
            {'name': 'Bruce Wayne', 'email': 'batman@dc.com', 'alias': 'Batman', 'power': 'Detective Skills'},
            {'name': 'Diana Prince', 'email': 'wonderwoman@dc.com', 'alias': 'Wonder Woman', 'power': 'Warrior Princess'},
            {'name': 'Barry Allen', 'email': 'flash@dc.com', 'alias': 'The Flash', 'power': 'Super Speed'},
            {'name': 'Arthur Curry', 'email': 'aquaman@dc.com', 'alias': 'Aquaman', 'power': 'Ocean Master'},
        ]

        users_data = []
        user_id = 1
        
        for hero in marvel_heroes:
            users_data.append({
                '_id': user_id,
                'name': hero['name'],
                'email': hero['email'],
                'alias': hero['alias'],
                'power': hero['power'],
                'team_id': 1,
                'total_points': random.randint(500, 2000),
                'created_at': datetime.now()
            })
            user_id += 1

        for hero in dc_heroes:
            users_data.append({
                '_id': user_id,
                'name': hero['name'],
                'email': hero['email'],
                'alias': hero['alias'],
                'power': hero['power'],
                'team_id': 2,
                'total_points': random.randint(500, 2000),
                'created_at': datetime.now()
            })
            user_id += 1

        db.users.insert_many(users_data)
        self.stdout.write(self.style.SUCCESS(f'Created {len(users_data)} users'))

        # Create Activities
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Boxing', 'CrossFit']
        activities_data = []
        activity_id = 1

        for user in users_data:
            # Each user has 3-5 activities
            num_activities = random.randint(3, 5)
            for i in range(num_activities):
                days_ago = random.randint(0, 30)
                activities_data.append({
                    '_id': activity_id,
                    'user_id': user['_id'],
                    'activity_type': random.choice(activity_types),
                    'duration_minutes': random.randint(15, 120),
                    'calories_burned': random.randint(100, 800),
                    'distance_km': round(random.uniform(1.0, 15.0), 2),
                    'points_earned': random.randint(10, 100),
                    'date': datetime.now() - timedelta(days=days_ago),
                    'notes': f'Training session for {user["alias"]}'
                })
                activity_id += 1

        db.activities.insert_many(activities_data)
        self.stdout.write(self.style.SUCCESS(f'Created {len(activities_data)} activities'))

        # Create Leaderboard entries
        leaderboard_data = []
        for idx, user in enumerate(sorted(users_data, key=lambda x: x['total_points'], reverse=True), 1):
            leaderboard_data.append({
                '_id': idx,
                'user_id': user['_id'],
                'rank': idx,
                'total_points': user['total_points'],
                'team_id': user['team_id'],
                'last_updated': datetime.now()
            })

        db.leaderboard.insert_many(leaderboard_data)
        self.stdout.write(self.style.SUCCESS(f'Created {len(leaderboard_data)} leaderboard entries'))

        # Create Workouts (Personalized suggestions)
        workout_suggestions = {
            'Running': ['Interval Training', '5K Run', 'Sprint Training', 'Hill Repeats'],
            'Cycling': ['Endurance Ride', 'Hill Climbs', 'Speed Work', 'Recovery Ride'],
            'Swimming': ['Freestyle Laps', 'Interval Training', 'Technique Work', 'Distance Swim'],
            'Weightlifting': ['Upper Body', 'Lower Body', 'Full Body', 'Core Strength'],
            'Yoga': ['Vinyasa Flow', 'Power Yoga', 'Restorative Yoga', 'Hot Yoga'],
            'Boxing': ['Heavy Bag', 'Speed Bag', 'Shadow Boxing', 'Sparring'],
            'CrossFit': ['AMRAP', 'EMOM', 'Chipper', 'Hero WOD']
        }

        workouts_data = []
        workout_id = 1

        for user in users_data:
            # Each user gets 2-3 workout suggestions
            for i in range(random.randint(2, 3)):
                activity_type = random.choice(activity_types)
                workouts_data.append({
                    '_id': workout_id,
                    'user_id': user['_id'],
                    'workout_type': activity_type,
                    'title': random.choice(workout_suggestions[activity_type]),
                    'description': f'Personalized {activity_type} workout for {user["alias"]}',
                    'difficulty': random.choice(['Beginner', 'Intermediate', 'Advanced']),
                    'estimated_duration': random.randint(20, 90),
                    'estimated_calories': random.randint(150, 700),
                    'created_at': datetime.now()
                })
                workout_id += 1

        db.workouts.insert_many(workouts_data)
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts_data)} workout suggestions'))

        # Print summary
        self.stdout.write(self.style.SUCCESS('\n=== Database Population Complete ==='))
        self.stdout.write(f'Teams: {len(teams_data)}')
        self.stdout.write(f'Users: {len(users_data)}')
        self.stdout.write(f'Activities: {len(activities_data)}')
        self.stdout.write(f'Leaderboard Entries: {len(leaderboard_data)}')
        self.stdout.write(f'Workout Suggestions: {len(workouts_data)}')
        self.stdout.write(self.style.SUCCESS('====================================='))

        client.close()
