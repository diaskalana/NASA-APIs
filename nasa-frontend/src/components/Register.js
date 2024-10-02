import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Import CSS file for background animation

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already authenticated
        const token = localStorage.getItem('auth_token');
        if (token) {
            navigate('/'); // Redirect to home if already logged in
        }
    }, [navigate]);

    const handleRegister = async () => {
        try {
            await axios.post('/auth/register', { username, password });
            setSuccessMessage('Registration Successful. Please login.');
            setErrorMessage('');
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect to login after 2 seconds
        } catch (error) {
            setErrorMessage('Registration failed. Please try again.');
            setSuccessMessage('');
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="container-fluid register-container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h3 className="text-center">Register</h3>
                        </div>
                        <div className="card-body">
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                                <button type="button" className="btn btn-primary btn-block" onClick={handleRegister}>Register</button>
                            </form>
                            <div className="mt-3 text-center">
                                <p>Already registered? <Link to="/login">Login here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
