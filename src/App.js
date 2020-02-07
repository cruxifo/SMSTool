import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import SMSApp from "./components/sms-app.component";
import SMSCompose from "./components/sms-composesms.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/compose" exact component={SMSCompose} />
        <Route path="/sms" component={SMSApp} />
      </div>
    </Router>
    
  );
}

export default App;
