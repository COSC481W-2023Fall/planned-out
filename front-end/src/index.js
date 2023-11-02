import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Registration from "./pages/Registration.js";
import Settings from "./pages/Settings.js";
import Login from "./pages/Login.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="/registration" element={<Registration />} />
        </Route>
        <Route path="/settings" element={<Layout />}>
          <Route index element={<Settings />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
