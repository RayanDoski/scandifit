import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

// Header and Footer
import Header from './components/header.js';
import Footer from './components/footer.js';

// Homepage
import Home from './pages/home.js';
import HomePage from './pages/homePage.js'

// Popups
import SpecialMultivitaminOfferPopup from './pages/popups/specialMultivitaminOffer.js';

// Login System
import Login from './pages/loginSystem/login.js'
import Register from './pages/loginSystem/register.js'
import UserInfo from './pages/usersInfo.js'

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

// contact us 
import ContactUs from './pages/contactUs.js' 

// Order Completed Page
import OrderCompleted from './pages/orderComplete.js'

// Product Pages
import MultivitaminPage from './pages/products/multivitamin.js'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<><Header /><HomePage /><Footer /></>} />
          <Route path="/home" element={<><Header /><Home /><Footer /></>} />

          {/* ContactUs */}
          <Route path="/contactus" element={<><Header /><ContactUs /><Footer /></>} />

          {/* Loginsystem */}
          <Route path="/login" element={<><Header /><Login /><Footer /></>} />
          <Route path="/register" element={<><Header /><Register /><Footer /></>} />
          <Route path="/profile/myprofile" element={<><Header /><UserInfo /><Footer /></>} />

          {/* Quizes */}
          <Route path="/trainingplan/quiz" element={<TrainingPlanQuiz />} />
          <Route path="/sleepplan/quiz" element={<SleepPlanQuiz />} />
          <Route path="/dietplan/quiz" element={<DietPlanQuiz />} />

          {/* Plans */}
          <Route path="/profile/trainingplan" element={<><Header /><TrainingPlan /><Footer /></>} />
          <Route path="/profile/sleepplan" element={<><Header /><SleepPlan /><Footer /></>} />
          <Route path="/profile/dietplan" element={<><Header /><DietPlan /><Footer /></>} />

          {/* Exercises */}
          <Route path="/profile/exercises/:muscle" element={<><Header /><Exercises /><Footer /></>} />
          <Route path="/profile/exercise/:id" element={<><Header /><Exercise /><Footer /></>} />

          {/* Order Completed */}
          <Route path="/ordercomplete/:sessionId" element={<><Header /><OrderCompleted /><Footer /></>} />

          {/* Products */}
          <Route path="/products/multivitamin" element={<><Header /><MultivitaminPage /><Footer /></>} />

        </Routes>

        {/* To Show Popup */}
        <SpecialMultivitaminOfferPopup />
        
    </Router>
  );
}

export default App;
