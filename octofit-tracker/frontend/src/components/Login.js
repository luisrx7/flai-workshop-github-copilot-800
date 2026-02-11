import React, { useState } from 'react';
import logo from '../octofitapp-small.png';

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login logic
      console.log('Logging in with:', formData.email);
      if (onLogin) onLogin();
    } else {
      // Registration logic
      if (formData.password === formData.confirmPassword) {
        console.log('Registering user:', formData.email);
        if (onLogin) onLogin();
      } else {
        alert('Passwords do not match!');
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              {/* Logo and Title */}
              <div className="text-center mb-4">
                <img src={logo} alt="OctoFit Logo" style={{ height: '80px', marginBottom: '1rem' }} />
                <h2 className="fw-bold text-primary">OctoFit Tracker</h2>
                <p className="text-muted">Track your fitness journey</p>
              </div>

              {/* Tabs */}
              <ul className="nav nav-pills nav-justified mb-4">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${isLogin ? 'active' : ''}`}
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${!isLogin ? 'active' : ''}`}
                    onClick={() => setIsLogin(false)}
                  >
                    Register
                  </button>
                </li>
              </ul>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required={!isLogin}
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                  </div>
                )}

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    {isLogin ? 'Login' : 'Register'}
                  </button>
                </div>
              </form>

              {isLogin && (
                <div className="text-center mt-3">
                  <button type="button" className="btn btn-link text-decoration-none small p-0">Forgot password?</button>
                </div>
              )}

              {/* Demo Credentials */}
              <div className="alert alert-info mt-4 small" role="alert">
                <strong>Demo:</strong> Use any email/password to login
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-4 text-muted">
            <p className="small">
              Built for Mergington High School Physical Education
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
