import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Dashboard} from "./pages/dashIndex"
import {Auth} from "./pages/authIndex"

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="appContainer">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
