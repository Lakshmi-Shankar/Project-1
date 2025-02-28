import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./Pages/signup"
import Home from "./Pages/home"
import Login from './Pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;
