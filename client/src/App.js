import Home from "./pages/home/home";
import Profile from "./pages/profile/Profile"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {

  const {user}=useContext(AuthContext)
  return (
    <Router>
    <Routes>
      <Route path="/" element={user ? <Home /> : <Register/>} />
      <Route path="login" element={user ? <Navigate to="/"/>: <Login />} />
      <Route path="register" element={user ? <Navigate to="/"/>: <Register />} />
      <Route path="/profile/:username" element={<Profile />} />

    </Routes>
  </Router>
  );
  
}

export default App;
