import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AdList } from "./pages/AdList";
import { Home } from "./pages/Home";

import './styles/main.css';

export function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/ad-list" element={<AdList />} />
      </Routes >
    </BrowserRouter>
  )
}
