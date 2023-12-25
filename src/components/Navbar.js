import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
   
    function toggleNav() {
        let x = document.getElementById("myNavbar");
        let icon = document.getElementById("icon");
        if (x.className === "navbar") {
          x.className += " responsive";
          icon.innerText="X"
        } else {
          x.className = "navbar";
          icon.innerText="☰"
        }
      }
    return (
        <nav className="navbar" id="myNavbar">
            <Link ></Link>
            <Link to="/">Cadastrar</Link>
            <Link to="/recognition">Reconhecer</Link>
            <Link to="/usuarios">Usuários Cadastrados</Link>
            <Link to="/presencas">Presenças Registradas</Link>
            <span className="hamburger-icon" id="icon" onClick={toggleNav}>&#9776;</span>
        </nav>
    );
}

export default Navbar;
