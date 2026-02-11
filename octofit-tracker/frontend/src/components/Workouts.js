import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      // Construct API URL using environment variable for codespace
      const codespace = process.env.REACT_APP_CODESPACE_NAME || process.env.CODESPACE_NAME;
      const apiUrl = codespace 
        ? `https://${codespace}-8000.app.github.dev/api/workouts/`
        : 'http://localhost:8000/api/workouts/';
      
      console.log('Fetching workouts from:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // Handle both paginated (.results) and plain array responses
      setWorkouts(Array.isArray(data) ? data : (data.results || []));
      setError(null);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError(err.message);
      // Use mock data on error
      setWorkouts([
        { id: 1, name: 'Push-ups Challenge', category: 'Strength', difficulty: 'Beginner', duration: 15, description: 'Basic push-up routine' },
        { id: 2, name: '5K Run', category: 'Cardio', difficulty: 'Intermediate', duration: 30, description: 'Moderate distance run' },
        { id: 3, name: 'HIIT Session', category: 'Cardio', difficulty: 'Advanced', duration: 20, description: 'High intensity interval training' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkouts = selectedDifficulty === 'all' 
    ? workouts 
    : workouts.filter(w => w.difficulty === selectedDifficulty);

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      'Beginner': 'bg-success',
      'Intermediate': 'bg-warning text-dark',
      'Advanced': 'bg-danger'
    };
    return badges[difficulty] || 'bg-secondary';
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
      <h1 className="mb-4">Workout Suggestions</h1>

      {error && (
        <div className="alert alert-warning" role="alert">
          Using mock data. API Error: {error}
        </div>
      )}

      {/* Filter Controls */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="mb-0">Filter by Difficulty</h5>
            </div>
            <div className="col-md-6">
              <select 
                className="form-select" 
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Workouts</h5>
              <p className="display-6">{workouts.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Filtered Results</h5>
              <p className="display-6">{filteredWorkouts.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Categories</h5>
              <p className="display-6">{[...new Set(workouts.map(w => w.category))].length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Workouts Table */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Available Workouts</h5>
          <button className="btn btn-primary btn-sm" onClick={fetchWorkouts}>
            Refresh
          </button>
        </div>
        <div className="card-body">
          {filteredWorkouts.length === 0 ? (
            <p className="text-center text-muted">No workouts found for selected filter.</p>
          ) : (
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Workout Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Difficulty</th>
                  <th scope="col">Duration (mins)</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkouts.map((workout, index) => (
                  <tr key={workout.id || index}>
                    <th scope="row">{index + 1}</th>
                    <td><strong>{workout.name}</strong></td>
                    <td><span className="badge bg-info">{workout.category}</span></td>
                    <td>
                      <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                        {workout.difficulty}
                      </span>
                    </td>
                    <td>{workout.duration}</td>
                    <td>{workout.description}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-success">Start</button>
                    </td>
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

export default Workouts;
