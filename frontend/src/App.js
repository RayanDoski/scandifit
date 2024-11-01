import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
          <Route path="/" element={<><Helmet><title>Home</title></Helmet><Header /><HomePage /><Footer /></>} />
          <Route path="/home" element={<><Helmet><title>Homepage</title></Helmet><Header /><Home /><Footer /></>} />

          {/* ContactUs */}
          <Route path="/contactus" element={<><Helmet><title>Kontakta Oss</title></Helmet><Header /><ContactUs /><Footer /></>} />

          {/* Loginsystem */}
          <Route path="/login" element={<><Helmet><title>Logga In</title></Helmet><Header /><Login /><Footer /></>} />
          <Route path="/register" element={<><Helmet><title>Registrera Dig</title></Helmet><Header /><Register /><Footer /></>} />
          <Route path="/profile/myprofile" element={<><Helmet><title>Min Profil</title></Helmet><Header /><UserInfo /><Footer /></>} />

          {/* Quizes */}
          <Route path="/trainingplan/quiz" element={<><Helmet><title>Träningsplan Quiz</title></Helmet><TrainingPlanQuiz /></>} />
          <Route path="/sleepplan/quiz" element={<><Helmet><title>Sömnplan Quiz</title></Helmet><SleepPlanQuiz /></>} />
          <Route path="/dietplan/quiz" element={<><Helmet><title>Kostplan Quiz</title></Helmet><DietPlanQuiz /></>} />

          {/* Plans */}
          <Route path="/profile/trainingplan" element={<><Helmet><title>Din Träningsplan</title></Helmet><Header /><TrainingPlan /><Footer /></>} />
          <Route path="/profile/sleepplan" element={<><Helmet><title>Din Sömnplan</title></Helmet><Header /><SleepPlan /><Footer /></>} />
          <Route path="/profile/dietplan" element={<><Helmet><title>Din Kostplan</title></Helmet><Header /><DietPlan /><Footer /></>} />

          {/* Exercises */}
          <Route path="/profile/exercises/:muscle" element={<><Helmet><title>Övningar</title></Helmet><Header /><Exercises /><Footer /></>} />
          <Route path="/profile/exercise/:id" element={<><Helmet><title>Övning</title></Helmet><Header /><Exercise /><Footer /></>} />

          {/* Order Completed */}
          <Route path="/ordercomplete/:sessionId" element={<><Helmet><title>Tack För Din Beställning</title></Helmet><Header /><OrderCompleted /><Footer /></>} />

          {/* Products */}
          <Route path="/products/multivitamin" element={<><Helmet><title>Multivitamin</title></Helmet><Header /><MultivitaminPage /><Footer /></>} />

        </Routes>

        {/* To Show Popup */}
        <SpecialMultivitaminOfferPopup />
        
    </Router>
  );
}

export default App;
