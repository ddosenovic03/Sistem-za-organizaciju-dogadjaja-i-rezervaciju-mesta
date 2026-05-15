import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import DogadjajiPage from "./pages/DogadjajiPage";
import OrganizatoriPage from "./pages/OrganizatoriPage";
import LokacijePage from "./pages/LokacijePage";
import PosetiociPage from "./pages/PosetiociPage";
import RezervacijaPage from "./pages/RezervacijaPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dogadjaji" element={<DogadjajiPage />} />
          <Route path="/organizatori" element={<OrganizatoriPage />} />
          <Route path="/lokacije" element={<LokacijePage />} />
          <Route path="/posetioci" element={<PosetiociPage />} />
          <Route path="/rezervacije" element={<RezervacijaPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
