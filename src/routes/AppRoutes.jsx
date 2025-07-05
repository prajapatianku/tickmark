import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Journal from "../pages/Journal";
import Portfolio from "../pages/Portfolio";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Navbar from "../components/Navbar";
import StockJournal from "../pages/StockJournal";
import Footer from "../components/Footer";
import CalculatorPage from "../pages/CalculatorPage";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/stockjournal" element={<StockJournal />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
