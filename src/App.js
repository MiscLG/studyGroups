import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateStudent from "./CreateStudent";
import EditStudent from "./EditStudent";
import StudentsList from "./StudentsList";

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://misclg.com" target="_blank">
            <img
              src={
                "https://www.misclg.com/media/AMIfv95ql-1ZTWPqqo0xRYepGwzkCTQvnxZ5eTeY_LwE0IVdIwIn3_W9d0Zno_qTtFK11tpcxuwCGOsNmNHJJ7AVuFHlqDd-dcDdW55mMwJG9cXxmOrWBp8UYgKtHhffD2kHVORuEMTqkYRizCJkCSP8iFvokpFzOxPu2xWuxaB3fH3tXTjKnittLZOl1eM3FwSvEgs158kwthnX_VbrbmRLi8FgEcZw7Udpf7oXXb6GksC7msAk2FReyVL3fslBEmDkDwNKxAIw5i_25S0RddNMcWUaNkuYTg"
              }
              width="30"
              height="30"
              alt="CodingTheSmartWay.com"
            />
          </a>
          <Link to="/" className="navbar-brand">
            MERN-Stack Study Group App
          </Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  Students
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">
                  Create Student
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/" exact component={StudentsList} />
        <Route path="/edit/:id" component={EditStudent} />
        <Route path="/create" component={CreateStudent} />
      </div>
    </Router>
  );
};
export default App;
