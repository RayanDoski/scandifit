import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Importing CSS
import '../styles/loadingScreen.css';

function LoadingScreenFullScreen() {
  return (
    <div className="loadingScreenBackground">
        <div class="spinner">
        </div>
    </div>
  );
  
}

export default LoadingScreenFullScreen