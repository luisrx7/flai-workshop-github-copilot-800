import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data for demonstration (replace with API call)
  useEffect(() => {
    // Simulate API call
    const mockUsers = [
      { 
        id: 1, 
        name: 'Tony Stark', 
        username: 'ironman', 
        email: 'ironman@marvel.com',
        alias: 'Iron Man',
        power: 'Technology',
        team_id: 1,
        role: 'captain',
        total_points: 1850
      },
      { 
        id: 2, 
        name: 'Steve Rogers', 
        username: 'captainamerica', 
        email: 'captainamerica@marvel.com',
        alias: 'Captain America',
        power: 'Super Soldier',
        team_id: 1,
        role: 'member',
        total_points: 1720
      },
      { 
        id: 3, 
        name: 'Thor Odinson', 
        username: 'thor', 
        email: 'thor@marvel.com',
        alias: 'Thor',
        power: 'God of Thunder',
        team_id: 1,
        role: 'member',
        total_points: 1960
      },
      { 
        id: 4, 
        name: 'Natasha Romanoff', 
        username: 'blackwidow', 
        email: 'blackwidow@marvel.com',
        alias: 'Black Widow',
        power: 'Spy Master',
        team_id: 1,
        role: 'member',
        total_points: 1430
      },
      { 
        id: 5, 
        name: 'Bruce Banner', 
        username: 'hulk', 
        email: 'hulk@marvel.com',
        alias: 'Hulk',
        power: 'Super Strength',
        team_id: 1,
        role: 'member',
        total_points: 1580
      },
      { 
        id: 6, 
        name: 'Clark Kent', 
        username: 'superman', 
        email: 'superman@dc.com',
        alias: 'Superman',
        power: 'Flight & Super Strength',
        team_id: 2,
        role: 'captain',
        total_points: 1940
      },
      { 
        id: 7, 
        name: 'Bruce Wayne', 
        username: 'batman', 
        email: 'batman@dc.com',
        alias: 'Batman',
        power: 'Detective Skills',
        team_id: 2,
        role: 'member',
        total_points: 1680
      },
      { 
        id: 8, 
        name: 'Diana Prince', 
        username: 'wonderwoman', 
        email: 'wonderwoman@dc.com',
        alias: 'Wonder Woman',
        power: 'Warrior Princess',
        team_id: 2,
        role: 'member',
        total_points: 1820
      },
      { 
        id: 9, 
        name: 'Barry Allen', 
        username: 'flash', 
        email: 'flash@dc.com',
        alias: 'The Flash',
        power: 'Super Speed',
        team_id: 2,
        role: 'member',
        total_points: 1560
      },
      { 
        id: 10, 
        name: 'Arthur Curry', 
        username: 'aquaman', 
        email: 'aquaman@dc.com',
        alias: 'Aquaman',
        power: 'Ocean Master',
        team_id: 2,
        role: 'member',
        total_points: 1390
      }
    ];

    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const getTeamName = (teamId) => {
    return teamId === 1 ? 'Team Marvel' : teamId === 2 ? 'Team DC' : 'No Team';
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

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Error loading users: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>All Users</h1>
        <button className="btn btn-primary">
          + Add New User
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="display-6">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Team Marvel</h5>
              <p className="display-6">{users.filter(u => u.team_id === 1).length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Team DC</h5>
              <p className="display-6">{users.filter(u => u.team_id === 2).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">User Directory</h5>
        </div>
        <div className="card-body">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Alias</th>
                <th scope="col">Team</th>
                <th scope="col">Role</th>
                <th scope="col">Points</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td><strong>{user.name}</strong></td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge bg-info">{user.alias}</span>
                  </td>
                  <td>{getTeamName(user.team_id)}</td>
                  <td>
                    {user.role === 'captain' ? (
                      <span className="badge bg-warning text-dark">Captain</span>
                    ) : (
                      <span className="badge bg-secondary">Member</span>
                    )}
                  </td>
                  <td>{user.total_points.toLocaleString()}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleViewUser(user)}
                    >
                      View
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {showModal && selectedUser && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">Name:</th>
                      <td>{selectedUser.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Username:</th>
                      <td>{selectedUser.username}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email:</th>
                      <td>{selectedUser.email}</td>
                    </tr>
                    <tr>
                      <th scope="row">Alias:</th>
                      <td><span className="badge bg-info">{selectedUser.alias}</span></td>
                    </tr>
                    <tr>
                      <th scope="row">Power:</th>
                      <td>{selectedUser.power}</td>
                    </tr>
                    <tr>
                      <th scope="row">Team:</th>
                      <td>{getTeamName(selectedUser.team_id)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Role:</th>
                      <td>
                        {selectedUser.role === 'captain' ? (
                          <span className="badge bg-warning text-dark">Captain</span>
                        ) : (
                          <span className="badge bg-secondary">Member</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Total Points:</th>
                      <td>{selectedUser.total_points.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Edit User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
