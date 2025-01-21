import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Todo from "./components/Todo";
import Finance from "./components/Finance";
import Myreadings from "./components/Myreadings";
import "./App.css";
import EditTodo from "./components/EditTodo";
import EditMyreadings from "./components/EditMyreadings";
import Notes from "./components/Notes";
import Course from "./components/Course";
import Meetings from "./components/Meetings";

function App() {
  return (
    <>
      <Router>
        <nav className="fixed top-0 left-0 p-5 bg-primary w-[20%] text-blacktext h-full border-r-2 border-blacktext border-opacity-30">
          <ul>
            <li className="font-extrabold text-3xl mb-5"><Link to="/">t<span className="font-bold text-2xl">rax</span></Link></li>
            <li><Link to="/Profile" />
              <div className="flex items-center mb-5">
                <i className="fa-solid fa-user text-md mr-2 p-2 rounded-md border-blacktext border-opacity-40 border-2"></i>
                <div>
                  <p className="font-semibold text-sm">Marsya Aurelia</p>
                  <p className="font-regular text-xs">marsya.aureliasyah@gmail.com</p>
                </div>
              </div>
            </li>
            <li className="font-medium"><Link to="/"><i className="fa-solid fa-house text-lg mr-2"></i>Home</Link></li>
            <li className="font-medium"><Link to="/Todo"><i className="fa-solid fa-square-check text-lg mr-2"></i>To-do</Link></li>
            <li className="font-medium"><Link to="/Notes"><i className="fa-solid fa-book-open text-lg mr-2"></i>Notes</Link></li>
            <li className="font-medium"><Link to="/Myreadings"><i className="fa-solid fa-book text-lg mr-2"></i>My Readings</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Todo" element={<Todo />} />
          <Route path="/Finance" element={<Finance />} />
          <Route path="/Myreadings" element={<Myreadings />} />
          <Route path="/EditTodo/:ID" element={<EditTodo />} />
          <Route path="/EditMyreadings/:ID" element={<EditMyreadings />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/Course/:CourseID" element={<Course />} />
          <Route path="/Meetings/:MeetingID" element={<Meetings />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;