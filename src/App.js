import Navbar from './Navbar/Navbar';
import './App.css';
import '../src/assests/css/style.css'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
    <Navbar />
    </div>
  );
}

export default App;
