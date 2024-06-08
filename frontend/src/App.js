import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header.js';
import Footer from './components/footer.js';
import Login from './pages/login.js'
import Register from './pages/register.js'

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Header />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
