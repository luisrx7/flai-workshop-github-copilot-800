import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [activeTab, setActiveTab] = useState('individual');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      // Construct API URL using environment variable for codespace
      const codespace = process.env.REACT_APP_CODESPACE_NAME || process.env.CODESPACE_NAME;
      const apiUrl = codespace 
        ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
        : 'http://localhost:8000/api/leaderboard/';
      
      console.log('Fetching leaderboard from:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // Handle both paginated (.results) and plain array responses
      setLeaderboardData(Array.isArray(data) ? data : (data.results || []));
      setError(null);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const individualLeaders = [
    { rank: 1, name: 'Emily Davis', activities: 45, calories: 5600, streak: 14, badge: '🥇' },
    { rank: 2, name: 'Mike Johnson', activities: 42, calories: 5200, streak: 12, badge: '🥈' },
    { rank: 3, name: 'Sarah Smith', activities: 38, calories: 4800, streak: 10, badge: '🥉' },
    { rank: 4, name: 'Paul Octo', activities: 35, calories: 4500, streak: 9, badge: '' },
    { rank: 5, name: 'Jessica Cat', activities: 32, calories: 4200, streak: 8, badge: '' },
    { rank: 6, name: 'John Doe', activities: 30, calories: 4000, streak: 7, badge: '' },
    { rank: 7, name: 'Amy Wilson', activities: 28, calories: 3800, streak: 6, badge: '' },
    { rank: 8, name: 'Tom Brown', activities: 25, calories: 3500, streak: 5, badge: '' }
  ];

  const teamLeaders = [
    { rank: 1, name: 'Gym Rats', members: 15, activities: 312, calories: 22400, badge: '🥇' },
    { rank: 2, name: 'Fitness Warriors', members: 12, activities: 245, calories: 18500, badge: '🥈' },
    { rank: 3, name: 'Morning Runners', members: 8, activities: 156, calories: 12300, badge: '🥉' },
    { rank: 4, name: 'Night Owls', members: 10, activities: 180, calories: 13500, badge: '' },
    { rank: 5, name: 'Weekend Warriors', members: 6, activities: 98, calories: 8900, badge: '' }
  ];

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
      <h1 className="mb-4">Leaderboard</h1>

      {error && (
        <div className="alert alert-warning" role="alert">
          Using mock data. API Error: {error}
        </div>
      )}

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'individual' ? 'active' : ''}`}
            onClick={() => setActiveTab('individual')}
          >
            Individual Rankings
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            Team Rankings
          </button>
        </li>
      </ul>

      {/* Individual Leaderboard */}
      {activeTab === 'individual' && (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Top Athletes</h5>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Name</th>
                  <th scope="col">Activities</th>
                  <th scope="col">Calories Burned</th>
                  <th scope="col">Current Streak</th>
                  <th scope="col">Badge</th>
                </tr>
              </thead>
              <tbody>
                {individualLeaders.map((leader) => (
                  <tr key={leader.rank} className={leader.rank <= 3 ? 'table-warning' : ''}>
                    <th scope="row">
                      <span className={`badge ${
                        leader.rank === 1 ? 'bg-warning text-dark' :
                        leader.rank === 2 ? 'bg-secondary' :
                        leader.rank === 3 ? 'bg-danger' :
                        'bg-light text-dark'
                      }`}>
                        #{leader.rank}
                      </span>
                    </th>
                    <td>
                      <strong>{leader.name}</strong>
                      {leader.badge && <span className="ms-2">{leader.badge}</span>}
                    </td>
                    <td>{leader.activities}</td>
                    <td>{leader.calories.toLocaleString()}</td>
                    <td>
                      <span className="badge bg-success">{leader.streak} days</span>
                    </td>
                    <td>
                      {leader.rank === 1 && <span className="badge bg-warning text-dark">Champion</span>}
                      {leader.rank === 2 && <span className="badge bg-secondary">Runner-up</span>}
                      {leader.rank === 3 && <span className="badge bg-danger">Third Place</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Team Leaderboard */}
      {activeTab === 'team' && (
        <div className="card">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">Top Teams</h5>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Team Name</th>
                  <th scope="col">Members</th>
                  <th scope="col">Total Activities</th>
                  <th scope="col">Total Calories</th>
                  <th scope="col">Avg per Member</th>
                  <th scope="col">Badge</th>
                </tr>
              </thead>
              <tbody>
                {teamLeaders.map((team) => (
                  <tr key={team.rank} className={team.rank <= 3 ? 'table-success' : ''}>
                    <th scope="row">
                      <span className={`badge ${
                        team.rank === 1 ? 'bg-warning text-dark' :
                        team.rank === 2 ? 'bg-secondary' :
                        team.rank === 3 ? 'bg-danger' :
                        'bg-light text-dark'
                      }`}>
                        #{team.rank}
                      </span>
                    </th>
                    <td>
                      <strong>{team.name}</strong>
                      {team.badge && <span className="ms-2">{team.badge}</span>}
                    </td>
                    <td>{team.members}</td>
                    <td>{team.activities}</td>
                    <td>{team.calories.toLocaleString()}</td>
                    <td>{Math.round(team.calories / team.members).toLocaleString()}</td>
                    <td>
                      {team.rank === 1 && <span className="badge bg-warning text-dark">Top Team</span>}
                      {team.rank === 2 && <span className="badge bg-secondary">Runner-up</span>}
                      {team.rank === 3 && <span className="badge bg-danger">Third Place</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats Summary Cards */}
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="card-title text-muted">Your Current Rank</h6>
              <p className="display-4">#4</p>
              <p className="text-muted">Individual</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="card-title text-muted">Your Team Rank</h6>
              <p className="display-4">#2</p>
              <p className="text-muted">Fitness Warriors</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="card-title text-muted">Points to Next Rank</h6>
              <p className="display-4">300</p>
              <p className="text-muted">Keep going!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
