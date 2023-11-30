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
import Friends from "./pages/Friends.js";
import * as themes from './themes/schema.json';
import { setToLS } from './utils/storage';

export default function App() {
  setToLS("all-themes", themes.default);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/friends" element={<Layout />}/>
        <Route path="/settings" element={<Layout />}/>
        <Route path="/registration" element={<Registration />} />
        <Route exact path="/" element={<Layout />}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
