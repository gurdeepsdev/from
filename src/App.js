import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from "./Home";
import Thankyou from "./Thankyou";


function App() {
  return (
    <Router>
    <div>


      {/* Define Routes */}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Thankyou" element={<Thankyou />} />


   
      </Routes>
    </div>
  </Router>
  
  );
}

export default App;
