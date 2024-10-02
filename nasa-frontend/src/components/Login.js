import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { setAuthToken } from '../tokenStorage';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Import CSS file for background animation

function Login() {
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

    const handleLogin = async () => {
        try {
            const response = await axios.post('/auth/login', { username, password });
            const token = response.data.token;
            setAuthToken(token); // Store token in local storage
            setSuccessMessage('Logged In Successfully');
            setErrorMessage('');
            // Redirect to homepage after successful login
            setTimeout(() => {
                navigate('/');
                window.location.reload();
            }, 1000);
        } catch (error) {
            setErrorMessage('Login failed. Please check your credentials.');
            setSuccessMessage('');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container-fluid login-container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h3 className="text-center">Login</h3>
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
                                <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>
                            </form>
                            <div className="mt-3 text-center">
                                <p>New user? <Link to="/register">Register here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
