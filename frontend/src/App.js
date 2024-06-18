import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header.js';
import Footer from './components/footer.js';
import Login from './pages/login.js'
import Register from './pages/register.js'
import TrainingPlanQuiz from './pages/trainingPlanQuiz.js'
import TrainingPlan from './pages/trainingPlan.js'
import Exercises from './pages/exercises.js'
import Exercise from './pages/exercise.js'

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trainingplan/quiz" element={<TrainingPlanQuiz />} />
          <Route path="/profile/trainingplan" element={<TrainingPlan />} />
          <Route path="/profile/exercises/:muscle" element={<Exercises />} />
          <Route path="/profile/exercise/:id" element={<Exercise />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
