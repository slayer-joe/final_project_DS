import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<h1>Новости</h1>} />
                <Route path="/contacts" element={<h1>Контакты</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
