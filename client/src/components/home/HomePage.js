import React from 'react';
import '../../styles/app-styles.css';

const HomePage = () => {
    return (
        <header className="header">
            <div className="logo">
                UpFit
            </div>
            <nav className="navigation">
                <button className="loginButton">Login</button>
                <button className="signupButton">Signup</button>
            </nav>
        </header>
    );
};

export default HomePage;