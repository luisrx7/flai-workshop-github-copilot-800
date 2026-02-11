import React, { useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([
    { 
      id: 1, 
      name: 'Team Marvel', 
      members: 5, 
      totalActivities: 245, 
      totalCalories: 18500,
      captain: 'Tony Stark',
      description: "Earth's Mightiest Heroes"
    },
    { 
      id: 2, 
      name: 'Team DC', 
      members: 5, 
      totalActivities: 156, 
      totalCalories: 12300,
      captain: 'Clark Kent',
      description: 'Justice League United'
    }
  ]);

  const [myTeam] = useState(teams[0]);
  const [showModal, setShowModal] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', captain: '' });

  const teamMembers = [
    { id: 1, name: 'Tony Stark', alias: 'Iron Man', activities: 24, calories: 3450, role: 'Captain' },
    { id: 2, name: 'Steve Rogers', alias: 'Captain America', activities: 18, calories: 2800, role: 'Member' },
    { id: 3, name: 'Thor Odinson', alias: 'Thor', activities: 22, calories: 3100, role: 'Member' },
    { id: 4, name: 'Natasha Romanoff', alias: 'Black Widow', activities: 20, calories: 2900, role: 'Member' },
    { id: 5, name: 'Bruce Banner', alias: 'Hulk', activities: 19, calories: 2750, role: 'Member' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    const team = {
      id: teams.length + 1,
      name: newTeam.name,
      members: 1,
      totalActivities: 0,
      totalCalories: 0,
      captain: newTeam.captain
    };
    setTeams([...teams, team]);
    setNewTeam({ name: '', captain: '' });
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Teams</h1>

      {/* My Team Card */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">My Team: {myTeam.name}</h5>
        </div>
        <div className="card-body">
          <div className="row text-center">
            <div className="col-md-3">
              <h6>Members</h6>
              <p className="display-6 text-primary">{myTeam.members}</p>
              <small className="text-muted">Active Heroes</small>
            </div>
            <div className="col-md-3">
              <h6>Total Activities</h6>
              <p className="display-6 text-success">{myTeam.totalActivities}</p>
              <small className="text-muted">Workouts Logged</small>
            </div>
            <div className="col-md-3">
              <h6>Total Calories</h6>
              <p className="display-6 text-danger">{myTeam.totalCalories.toLocaleString()}</p>
              <small className="text-muted">Calories Burned</small>
            </div>
            <div className="col-md-3">
              <h6>Captain</h6>
              <p className="lead text-warning">{myTeam.captain}</p>
              <small className="text-muted">Team Leader</small>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Team Members</h5>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Alias</th>
                <th scope="col">Role</th>
                <th scope="col">Activities</th>
                <th scope="col">Calories Burned</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id}>
                  <th scope="row">{member.id}</th>
                  <td>{member.name}</td>
                  <td><span className="badge bg-info">{member.alias}</span></td>
                  <td>
                    {member.role === 'Captain' ? (
                      <span className="badge bg-warning text-dark">{member.role}</span>
                    ) : (
                      <span className="badge bg-secondary">{member.role}</span>
                    )}
                  </td>
                  <td>{member.activities}</td>
                  <td>{member.calories}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">View</button>
                    <button className="btn btn-sm btn-outline-danger">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Teams */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Teams</h5>
          <button 
            className="btn btn-success btn-sm"
            onClick={() => setShowModal(true)}
          >
            + Create Team
          </button>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team Name</th>
                <th scope="col">Captain</th>
                <th scope="col">Members</th>
                <th scope="col">Activities</th>
                <th scope="col">Calories</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <th scope="row">{team.id}</th>
                  <td><strong>{team.name}</strong></td>
                  <td>{team.captain}</td>
                  <td><span className="badge bg-primary">{team.members}</span></td>
                  <td>{team.totalActivities}</td>
                  <td>{team.totalCalories.toLocaleString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Team Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Team</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateTeam}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Team Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name"
                      name="name"
                      value={newTeam.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="captain" className="form-label">Captain Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="captain"
                      name="captain"
                      value={newTeam.captain}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      Create Team
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
