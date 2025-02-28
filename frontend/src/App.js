import react from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./Pages/signup"
import Home from "./Pages/home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup />}/>
        <Route path='/home' element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
