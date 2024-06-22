import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header.js';
import Footer from './components/footer.js';

// Login System
import Login from './pages/loginSystem/login.js'
import Register from './pages/loginSystem/register.js'

// Quizes
import TrainingPlanQuiz from './pages/quizes/trainingPlanQuiz.js'
import SleepPlanQuiz from './pages/quizes/sleepPlanQuiz.js'
import DietPlanQuiz from './pages/quizes/dietPlanQuiz.js'

// Plans
import TrainingPlan from './pages/plans/trainingPlan.js'
import SleepPlan from './pages/plans/sleepPlan.js'
import DietPlan from './pages/plans/dietplan.js'

// Exercises
import Exercises from './pages/exercises.js'
import Exercise from './pages/exercise.js'

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Header />} />

          {/* Loginsystem */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Quizes */}
          <Route path="/trainingplan/quiz" element={<TrainingPlanQuiz />} />
          <Route path="/sleepplan/quiz" element={<SleepPlanQuiz />} />
          <Route path="/dietplan/quiz" element={<DietPlanQuiz />} />

          {/* Plans */}
          <Route path="/profile/trainingplan" element={<TrainingPlan />} />
          <Route path="/profile/sleepplan" element={<SleepPlan />} />
          <Route path="/profile/dietplan" element={<DietPlan />} />

          {/* Exercises */}
          <Route path="/profile/exercises/:muscle" element={<Exercises />} />
          <Route path="/profile/exercise/:id" element={<Exercise />} />

        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
