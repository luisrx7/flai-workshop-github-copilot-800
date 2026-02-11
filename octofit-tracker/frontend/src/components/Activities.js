import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      // Construct API URL using environment variable for codespace
      const codespace = process.env.REACT_APP_CODESPACE_NAME || process.env.CODESPACE_NAME;
      const apiUrl = codespace 
        ? `https://${codespace}-8000.app.github.dev/api/activities/`
        : 'http://localhost:8000/api/activities/';
      
      console.log('Fetching activities from:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // Handle both paginated (.results) and plain array responses
      setActivities(Array.isArray(data) ? data : (data.results || []));
      setError(null);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError(err.message);
      // Use mock data on error
      setActivities([
        { id: 1, user_id: '1', activity_type: 'Running', duration: 30, calories_burned: 250, date: '2026-02-11', distance: 5.0 },
        { id: 2, user_id: '2', activity_type: 'Cycling', duration: 45, calories_burned: 300, date: '2026-02-10', distance: 15.0 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">All Activities</h1>

      {error && (
        <div className="alert alert-warning" role="alert">
          Using mock data. API Error: {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Activities</h5>
              <p className="display-6">{activities.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Calories</h5>
              <p className="display-6">
                {activities.reduce((sum, a) => sum + (a.calories_burned || 0), 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Distance</h5>
              <p className="display-6">
                {activities.reduce((sum, a) => sum + (a.distance || 0), 0).toFixed(1)} km
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Table */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Activity History</h5>
          <button className="btn btn-primary btn-sm" onClick={fetchActivities}>
            Refresh
          </button>
        </div>
        <div className="card-body">
          {activities.length === 0 ? (
            <p className="text-center text-muted">No activities found.</p>
          ) : (
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Activity Type</th>
                  <th scope="col">Duration (mins)</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Distance (km)</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity.id || index}>
                    <th scope="row">{index + 1}</th>
                    <td>{activity.user_id}</td>
                    <td><span className="badge bg-info">{activity.activity_type}</span></td>
                    <td>{activity.duration}</td>
                    <td>{activity.calories_burned}</td>
                    <td>{activity.distance ? activity.distance.toFixed(1) : 'N/A'}</td>
                    <td>{formatDate(activity.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activities;
