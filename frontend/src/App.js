import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import QuizQuestion from './pages/QuizQuestion';
import SubmittedPage from './pages/SubmittedPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/test-start" element={<QuizQuestion />} />
        <Route path="/submitted" element={<SubmittedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
