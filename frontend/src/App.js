import './App.css';
import Footer from './components/layout/footer/Footer';
import { Header } from './components/layout/header/Header';
import Home from './components/Home/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <>

      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer/>
      </Router>

    </>
  );
}

export default App;
