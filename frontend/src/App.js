import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header.js';
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/about" element={<Header />} />
        <Route path="/profile" element={<Header />} />
      </Routes>
    </Router>
  );
}

export default App;
