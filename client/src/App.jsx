import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {Dashboard} from "./pages/dashboard"
import {Auth} from "./pages/auth"
import { FinancialRecordsProvider } from './context/financial-record-context';
import { SignedIn, UserButton } from "@clerk/clerk-react"

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="appContainer">
        <div className='navbar'>
          <Link to={'/'}>Dashboard</Link>
          <SignedIn>
            <UserButton />
        </SignedIn>
        </div>
        <Routes>
          <Route path="/" element={<FinancialRecordsProvider><Dashboard /></FinancialRecordsProvider>} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
