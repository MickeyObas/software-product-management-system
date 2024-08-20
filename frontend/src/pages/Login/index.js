import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css'; 

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    function handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.access) {
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
                const from = location.state?.from || '/';
                navigate(from);
                console.log("NAVIGATED");
            } else {
                setError('Invalid Credentials');
            }
        })
        .catch(err => {
            setError('An error occurred: ' + err.message);
        });
    }

    return (
        <div className='wrapper'>
            <div className="login-container">
            <h1 className="login-header">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                {error && <p className="login-error">{error}</p>}
                <label className="login-label">
                    Email
                    <input
                        type="email"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className="login-label">
                    Password
                    <input
                        type="password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="login-button">Login</button>
                <div className="login-footer">
                    <p>Don't have an account? <a href="/register" className="login-link">Register</a></p>
                </div>
            </form>
        </div>
        </div>
    );
}
