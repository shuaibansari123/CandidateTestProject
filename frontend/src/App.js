import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
// import QuizQuestion from './pages/QuizQuestion';
import SubmittedPage from './pages/SubmittedPage';
import AuthRoute from './AuthGuard/AuthRoute';
import QuizComponent from './pages/QuizComponent';
// import AuthRoute from './components/AuthRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm onLogin={handleLogin} />} />
        <Route 
          path="/test-start" 
          element={
            <AuthRoute isAuthenticated={isAuthenticated}>
              <QuizComponent />
            </AuthRoute>
          } 
        />
        <Route 
          path="/submitted" 
          element={
            <AuthRoute isAuthenticated={isAuthenticated}>
              <SubmittedPage />
            </AuthRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
