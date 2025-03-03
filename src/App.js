import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from "./Home";
import Thankyou from "./Thankyou";
import Dform from "./Dform";



function App() {
  return (
    <Router>
    <div>


      {/* Define Routes */}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Thankyou" element={<Thankyou />} />
      <Route path="/Dform" element={<Dform />} />

      


   
      </Routes>
    </div>
  </Router>
  
  );
}

export default App;
