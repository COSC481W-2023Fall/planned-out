import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Settings from "./pages/Settings.js";
import Login from "./pages/Login.js";
import Registration from "./pages/Registration.js";
import * as themes from './themes/schema.json';
import { setToLS } from './utils/storage';

export default function App() {
    setToLS('all-themes', themes.default);
    return (
        <BrowserRouter>
            <Layout></Layout>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
