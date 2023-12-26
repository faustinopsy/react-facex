import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 

function Navbar() {
    const { user, logout } = useAuth(); 

    function toggleNav() {
        let x = document.getElementById("myNavbar");
        let icon = document.getElementById("icon");
        if (x.className === "navbar") {
            x.className += " responsive";
            icon.innerText = "X";
        } else {
            x.className = "navbar";
            icon.innerText = "☰";
        }
    }

    const handleLogout = () => {
        logout();
        
    };

    return (
        <nav className="navbar" id="myNavbar">
            <Link to="/"></Link>
            {user && (
                <>
                    <Link to="/cadastrar">Cadastrar</Link>
                    <Link to="/reconhecer">Reconhecer</Link>
                    <Link to="/usuarios">Usuários Cadastrados</Link>
                    <Link to="/presencas">Presenças Registradas</Link>
                    <Link onClick={handleLogout}>Logout</Link>
                </>
            )}
            {!user && (
                <Link to="/login">Login</Link>
            )}
            <span className="hamburger-icon" id="icon" onClick={toggleNav}>&#9776;</span>
        </nav>
    );
}

export default Navbar;
