import logo from "./logo.svg";
import "./App.css";
import Title from "./components/Title";
import Intro from "./components/Intro";

function App() {
    return (
        <div className="App">
            <Title />
            <Intro></Intro>


            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React - test merge conflict
                </a>
            </header>
        </div>
    );
}

export default App;
