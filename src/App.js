import Navbar from './Components/Navbar';
import './App.css';
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'
import Post from './Components/Post'
import DraftPost from './Components/Draft'
import Main from './Components/Main';

import { ToastContainer } from 'react-toastify';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
      <ToastContainer />
      <Navbar />
        <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/post" element={<Post />} />
        <Route exact path="/draft" element={<DraftPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
