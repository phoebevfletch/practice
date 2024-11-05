import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Quiz from "./components/Quiz";
import { Biscuits, JaffaCakes } from "./components/AllLists";
import Title from "./components/Title";
import './App.css';
import Connect4 from "./components/ConnectFour/Grid";
import Monoscuit from "./components/Monoscuit";

// Navbar component navigation between pages
const Navbar = () => (
    <nav className="navbar">
        <ul className="nav-list">
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/quiz">Quiz</Link></li>
            <li><Link className="nav-link" to="/connectFourGame">Connect4</Link></li>
            <li><Link className="nav-link" to="/monoscuit">Monoscuit</Link></li>
        </ul>
    </nav>
);

const HomePage = () => (
    <div>
        <u><Title text="Phoebe's Page" size="h1" /></u>
        <p>Here is a page dedicated to biscuits.</p>
        <Title text="Biscuits and how I rate them:" />
        <Biscuits />
        <p>As you can see, Jaffa cakes are on this list...</p>
        <p className="App-imposter"><b>They are an IMPOSTER!!!!</b></p>
        <p>Jaffa cakes are actually cakes... hence the name Jaffa<b>Cake</b></p>
        <Title text="Jaffa Cake Lawsuit" />
        <p>There was actually a lawsuit in 1991 over whether Jaffa Cakes were a biscuit or cake. This was to do with VAT differences between cakes and biscuits. McVitie's won and Jaffa Cakes were ruled as cakes, not biscuits.</p>
        <JaffaCakes />
        <header className="App-header">
            <img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/26/13/pa-9804902.jpg" width="400" />
            <a className="App-link" href="https://www.astonshaw.co.uk/jaffa-cake-tax/" target="_blank" rel="noopener noreferrer">
                Jaffa Cake Lawsuit
            </a>
        </header>
    </div>
);

const App = () => {
    return (
        <div className="App App-background">
            <Router>
                <Navbar /> {/* Navbar is displayed on all pages */}
                <div style={{ padding: "20px" }}>
                    <Routes>
                        {/* Define routes for each page */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/connectFourGame" element={<Connect4 />} />
                        <Route path="/monoscuit" element={<Monoscuit />} />
                        {/* Fallback 404 page */}
                        <Route path="*" element={<h2>Page not found</h2>} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default App;


