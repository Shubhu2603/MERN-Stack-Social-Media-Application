import Home from "./pages/home/home";
import Profile from "./pages/profile/Profile"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App({user}) {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/profile/:username" element={<Profile />} />

    </Routes>
  </Router>
  );
  
}

export default App;
