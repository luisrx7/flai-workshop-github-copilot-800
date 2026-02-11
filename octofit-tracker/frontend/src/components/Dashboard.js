import React from 'react';

function Dashboard() {
  const recentActivities = [
    { id: 1, activity: 'Running', duration: '30 mins', calories: 250, date: '2026-02-11' },
    { id: 2, activity: 'Strength Training', duration: '45 mins', calories: 180, date: '2026-02-10' },
    { id: 3, activity: 'Walking', duration: '20 mins', calories: 100, date: '2026-02-09' }
  ];

  const stats = {
    totalActivities: 24,
    totalCalories: 3450,
    weeklyGoal: 75,
    currentProgress: 60
  };

  // Format date to a readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Activities</h5>
              <p className="card-text display-6">{stats.totalActivities}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Calories Burned</h5>
              <p className="card-text display-6">{stats.totalCalories}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Weekly Goal</h5>
              <p className="card-text display-6">{stats.currentProgress}%</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Current Streak</h5>
              <p className="card-text display-6">7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Weekly Progress</h5>
          <div className="progress" style={{ height: '30px' }}>
            <div 
              className="progress-bar bg-success" 
              role="progressbar" 
              style={{ width: `${stats.currentProgress}%` }}
              aria-valuenow={stats.currentProgress} 
              aria-valuemin="0" 
              aria-valuemax="100"
            >
              {stats.currentProgress}% of {stats.weeklyGoal} mins
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Recent Activities</h5>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Activity</th>
                <th scope="col">Duration</th>
                <th scope="col">Calories</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity) => (
                <tr key={activity.id}>
                  <th scope="row">{activity.id}</th>
                  <td>{activity.activity}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.calories}</td>
                  <td>{formatDate(activity.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
