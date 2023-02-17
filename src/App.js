import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {Routes, Route, BrowserRouter as Router,Switch,Link, useNavigate} from 'react-router-dom';
import Categorypage from './components/Categorypage';
import Home from './components/Home';
import FullPost from './components/FullPost';
function App() {
  return (
    <div >
      <Router>
        <Navbar></Navbar>
        <Routes>
        <Route path="/" element={<Home/>}  ></Route>
          <Route path='/categoryPage/:category' element={<Categorypage/>}  ></Route>
          <Route path='/fullpost/:id' element={<FullPost/>}></Route>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
