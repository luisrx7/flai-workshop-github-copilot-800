import React, { useState } from 'react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Paul Octo',
    email: 'paul.octo@mergington.edu',
    age: 35,
    weight: 175,
    height: 70,
    fitnessGoal: 'Stay Active',
    weeklyGoal: 150
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const stats = {
    totalActivities: 24,
    totalCalories: 3450,
    averageDuration: 35,
    currentStreak: 7
  };

  const achievements = [
    { id: 1, name: '7 Day Streak', icon: '🔥', earned: true },
    { id: 2, name: '100 Activities', icon: '🎯', earned: false },
    { id: 3, name: 'Marathon Runner', icon: '🏃', earned: false },
    { id: 4, name: 'Consistency King', icon: '👑', earned: true }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Profile</h1>

      <div className="row">
        {/* Profile Information Card */}
        <div className="col-md-8 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Personal Information</h5>
              {!isEditing ? (
                <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              ) : (
                <div>
                  <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="card-body">
              {!isEditing ? (
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">Name:</th>
                      <td>{profile.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email:</th>
                      <td>{profile.email}</td>
                    </tr>
                    <tr>
                      <th scope="row">Age:</th>
                      <td>{profile.age} years</td>
                    </tr>
                    <tr>
                      <th scope="row">Weight:</th>
                      <td>{profile.weight} lbs</td>
                    </tr>
                    <tr>
                      <th scope="row">Height:</th>
                      <td>{profile.height} inches</td>
                    </tr>
                    <tr>
                      <th scope="row">Fitness Goal:</th>
                      <td>{profile.fitnessGoal}</td>
                    </tr>
                    <tr>
                      <th scope="row">Weekly Goal:</th>
                      <td>{profile.weeklyGoal} minutes</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name"
                      name="name"
                      value={editedProfile.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="age" className="form-label">Age</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="age"
                        name="age"
                        value={editedProfile.age}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="weight" className="form-label">Weight (lbs)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="weight"
                        name="weight"
                        value={editedProfile.weight}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="height" className="form-label">Height (inches)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="height"
                      name="height"
                      value={editedProfile.height}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fitnessGoal" className="form-label">Fitness Goal</label>
                    <select 
                      className="form-select" 
                      id="fitnessGoal"
                      name="fitnessGoal"
                      value={editedProfile.fitnessGoal}
                      onChange={handleInputChange}
                    >
                      <option value="Stay Active">Stay Active</option>
                      <option value="Lose Weight">Lose Weight</option>
                      <option value="Build Muscle">Build Muscle</option>
                      <option value="Improve Endurance">Improve Endurance</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="weeklyGoal" className="form-label">Weekly Goal (minutes)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="weeklyGoal"
                      name="weeklyGoal"
                      value={editedProfile.weeklyGoal}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Stats Summary Card */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Statistics</h5>
            </div>
            <div className="card-body">
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td><strong>Total Activities:</strong></td>
                    <td>{stats.totalActivities}</td>
                  </tr>
                  <tr>
                    <td><strong>Calories Burned:</strong></td>
                    <td>{stats.totalCalories}</td>
                  </tr>
                  <tr>
                    <td><strong>Avg Duration:</strong></td>
                    <td>{stats.averageDuration} mins</td>
                  </tr>
                  <tr>
                    <td><strong>Current Streak:</strong></td>
                    <td>{stats.currentStreak} days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="card mt-3">
            <div className="card-header">
              <h5 className="mb-0">Achievements</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="col-6 text-center mb-3">
                    <div className={`p-3 rounded ${achievement.earned ? 'bg-success-subtle' : 'bg-light'}`}>
                      <div style={{ fontSize: '2rem' }}>{achievement.icon}</div>
                      <small className="d-block mt-2">{achievement.name}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
