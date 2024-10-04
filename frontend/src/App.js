import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import QuizComponent from './pages/QuizComponent';
import SubmittedPage from './pages/SubmittedPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm onLogin={handleLogin} />} />
        <Route path="/test-start" element={<QuizComponent />} />
        <Route path="/submitted" element={<SubmittedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
