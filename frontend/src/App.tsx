import './App.css';
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import HomePage from './pages/HomePage';
import StockNews from './components/StockNews';
import NavBar from './components/NavBar';
import AboutUs from './pages/AboutUs';
import AnalysisPage from "./pages/AnalysisPage";
import Login from "./components/Login"
import SignUp from './components/SignUp';
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"; 
import Contact from "./pages/Contact";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/news" element={<StockNews />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Inter:400,700&display=swap"
      />
    </div>
  );
}

export default App;
