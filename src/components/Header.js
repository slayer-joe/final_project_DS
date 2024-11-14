import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">Music App</div>
            <nav>
                <ul>
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/news">Новости</Link></li>
                    <li><Link to="/contacts">Контакты</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;