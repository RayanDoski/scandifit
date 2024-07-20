import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Importing CSS
import '../styles/loadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loadingScreenDiv">
        <div class="spinner">
        </div>
    </div>
  );
  
}

export default LoadingScreen