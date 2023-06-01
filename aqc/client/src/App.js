import AQuestionPage from './pages/AQuestionPage';
import Home from './pages/Home'
import AQuestionList from './pages/AQuestionList'
import AnswerPage from './pages/AnswerPage'
import NavBar from './components/NavBar';

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/aq/:aqid" element={<AQuestionPage />} />
          <Route path="/answer/:aqid" element={<AnswerPage />} />
          <Route path="/aqlist" element={<AQuestionList />} />
          <Route path="/"  element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
