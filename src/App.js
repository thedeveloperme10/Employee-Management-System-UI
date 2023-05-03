import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EMSComponent from "./components/EMSComponent";
import EmployeeWrapperComponent from "./components/EmployeeWrapperComponent";

function App() {
  return (
    <div>
      <Router>
        <div className= "container">
          <Routes>
            <Route path = "/" element = {<EMSComponent/>}></Route>
            <Route path = "/employee/:empId" element = {<EmployeeWrapperComponent/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;