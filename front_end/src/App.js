import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateStudent from "./components/CreateStudent";
import EditStudent from "./components/EditStudent";
import StudentsList from "./components/StudentsList";
import CreateCourse from "./components/CreateCourse";
import EditCourse from "./components/EditCourse";
import CoursesList from "./components/CoursesList";
import CreateStudyLocation from "./components/CreateStudyLocation";
import EditStudyLocation from "./components/EditStudyLocation";
import StudyLocationList from "./components/StudyLocationsList";

import { CreateAddress } from "./components/CreateAddress";
import EditAddress from "./components/EditAddress";
import AddressesList from "./components/AddressesList";
import { CreateScheduleEntry } from "./components/CreateScheduleEntry";
import EditScheduleEntry from "./components/EditScheduleEntry";
import ScheduleEntriesList from "./components/ScheduleEntriesList";
import { CreatePreferences } from "./components/CreatePreferences";
import PreferencesList from "./components/PreferencesList";
import EditPreferences from "./components/EditPreferences";

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://misclg.com">
            <img
              src={
                "https://www.misclg.com/media/AMIfv95ql-1ZTWPqqo0xRYepGwzkCTQvnxZ5eTeY_LwE0IVdIwIn3_W9d0Zno_qTtFK11tpcxuwCGOsNmNHJJ7AVuFHlqDd-dcDdW55mMwJG9cXxmOrWBp8UYgKtHhffD2kHVORuEMTqkYRizCJkCSP8iFvokpFzOxPu2xWuxaB3fH3tXTjKnittLZOl1eM3FwSvEgs158kwthnX_VbrbmRLi8FgEcZw7Udpf7oXXb6GksC7msAk2FReyVL3fslBEmDkDwNKxAIw5i_25S0RddNMcWUaNkuYTg"
              }
              width="30"
              height="30"
              alt="MiscLG.com"
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
              <li className="navbar-item">
                <Link to="/address" className="nav-link">
                  Addresses
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/address/create" className="nav-link">
                  Create Address
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/scheduleEntry" className="nav-link">
                  ScheduleEntries
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/scheduleEntry/create" className="nav-link">
                  Create Schedule Entry
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/course" className="nav-link">
                  Courses
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/course/create" className="nav-link">
                  Create Course
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/preferences" className="nav-link">
                  Preferences
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/preferences/create" className="nav-link">
                  Create Preferences
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/studyLocation" className="nav-link">
                  Study Locations
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/studyLocation/create" className="nav-link">
                  Create Study Locations
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/" exact component={StudentsList} />
        <Route path="/edit/:id" component={EditStudent} />
        <Route path="/create" component={CreateStudent} />
        <Route path="/address" exact component={AddressesList} />
        <Route path="/address/edit/:id" component={EditAddress} />
        <Route path="/address/create" component={CreateAddress} />
        <Route path="/scheduleEntry" exact component={ScheduleEntriesList} />
        <Route path="/scheduleEntry/edit/:id" component={EditScheduleEntry} />
        <Route path="/scheduleEntry/create" component={CreateScheduleEntry} />
        <Route path="/course" exact component={CoursesList} />
        <Route path="/course/edit/:id" component={EditCourse} />
        <Route path="/course/create" component={CreateCourse} />
        <Route path="/preferences" exact component={PreferencesList} />
        <Route path="/preferences/edit/:id" component={EditPreferences} />
        <Route path="/preferences/create" component={CreatePreferences} />
        <Route path="/studyLocation" exact component={StudyLocationList} />
        <Route path="/studyLocation/edit/:id" component={EditStudyLocation} />
        <Route path="/studyLocation/create" component={CreateStudyLocation} />
      </div>
    </Router>
  );
};
export default App;
