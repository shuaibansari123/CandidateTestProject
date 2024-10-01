import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import QuizQuestion from './pages/QuizQuestion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/test-start" element={<QuizQuestion />} />
      </Routes>
    </Router>
  );
}

export default App;
