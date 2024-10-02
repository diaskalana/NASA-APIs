import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { getAuthToken, removeAuthToken } from '../tokenStorage';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeAuthToken(); // Remove token from local storage
        navigate('/login'); // Redirect to login page after logout
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" className="mr-2" style={{ height: '50px' }} />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/apod">APOD</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mars-rover-photos">Mars Rover Photos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/earth-imagery">Earth Imagery</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/image-video">Images & Videos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/epic">EPIC</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/donki">DONKI</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/insight">Mars Weather Service</Link>
                        </li>
                        {getAuthToken() ? (
                            <>
                                <li className="nav-item" style={{ marginLeft: '20px' }}>
                                    <button className="btn btn-danger navbar-btn" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item" style={{ margin: '0 20px' }}>
                                    <Link className="btn btn-danger navbar-btn" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-success navbar-btn" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                        {/* Add more navigation links as needed */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
