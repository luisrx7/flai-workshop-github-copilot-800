import React, { useState } from 'react';

function ActivityLog() {
  const [activities, setActivities] = useState([
    { id: 1, type: 'Running', duration: 30, calories: 250, date: '2026-02-11', notes: 'Morning jog in the park' },
    { id: 2, type: 'Strength Training', duration: 45, calories: 180, date: '2026-02-10', notes: 'Upper body workout' },
    { id: 3, type: 'Walking', duration: 20, calories: 100, date: '2026-02-09', notes: 'Evening walk' },
    { id: 4, type: 'Cycling', duration: 40, calories: 300, date: '2026-02-08', notes: 'Trail ride' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: '',
    duration: '',
    calories: '',
    date: '',
    notes: ''
  });

  // Format date to a readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activity = {
      id: activities.length + 1,
      ...newActivity,
      duration: parseInt(newActivity.duration),
      calories: parseInt(newActivity.calories)
    };
    setActivities([activity, ...activities]);
    setNewActivity({ type: '', duration: '', calories: '', date: '', notes: '' });
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Activity Log</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Log New Activity
        </button>
      </div>

      {/* Activity Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">All Activities</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Activity Type</th>
                <th scope="col">Duration (mins)</th>
                <th scope="col">Calories</th>
                <th scope="col">Date</th>
                <th scope="col">Notes</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <th scope="row">{activity.id}</th>
                  <td>{activity.type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.calories}</td>
                  <td>{formatDate(activity.date)}</td>
                  <td>{activity.notes}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding new activity */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Log New Activity</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">Activity Type</label>
                    <select 
                      className="form-select" 
                      id="type"
                      name="type"
                      value={newActivity.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select activity...</option>
                      <option value="Running">Running</option>
                      <option value="Walking">Walking</option>
                      <option value="Cycling">Cycling</option>
                      <option value="Strength Training">Strength Training</option>
                      <option value="Swimming">Swimming</option>
                      <option value="Yoga">Yoga</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration (minutes)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="duration"
                      name="duration"
                      value={newActivity.duration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="calories" className="form-label">Calories Burned</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="calories"
                      name="calories"
                      value={newActivity.calories}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="date"
                      name="date"
                      value={newActivity.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">Notes</label>
                    <textarea 
                      className="form-control" 
                      id="notes"
                      name="notes"
                      rows="3"
                      value={newActivity.notes}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Activity
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

export default ActivityLog;
