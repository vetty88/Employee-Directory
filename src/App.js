import React from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import EmpList from './components/EmpList'

function App() {
    return (
      <div className="container">
        <Navbar />
        <Jumbotron />
        <EmpList />
      </div>
    );
  }
  
  export default App;
  
