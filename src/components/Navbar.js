import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isActive, setIsActive] = useState(false);

    const toggleNav = () => {
        setIsActive(!isActive);
    };

    return (
        <nav className={`navbar ${isActive ? 'responsive' : ''}`}>
            <Link to="/">Cadastrar</Link>
            <Link to="/recognition">Reconhecer</Link>
            <Link to="/usuarios">Usuários Cadastrados</Link>
            <Link to="/presencas">Presenças Registradas</Link>
            <span className="hamburger-icon" onClick={toggleNav}>&#9776;</span>
        </nav>
    );
}

export default Navbar;
