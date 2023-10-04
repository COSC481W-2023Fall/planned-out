import { useEffect, useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    const [message, setMessage] = useState([]);

    const handleSubmit = (e) => {

        fetch("http://localhost:5050/hello-world")
            .then((res) => res.json())
            .then((data) => setMessage(data));
            console.log(message);
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    <button
                        className="App-button"
                        onClick={(e) => {
                            handleSubmit(e)
                        }
                        }
                    >
                        Click Me
                    </button>
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}


export default App;
