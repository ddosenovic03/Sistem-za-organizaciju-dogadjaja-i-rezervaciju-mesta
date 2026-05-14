import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import DogadjajList from './components/DogadjajList'
import OrganizatorForma from './components/OrganizatorForma'
import LokacijaForma from './components/LokacijaForma'
import PosetilacForma from './components/PosetilacForma'

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Sistem za organizaciju događaja i rezervaciju mesta</h1>

      <div className="row">
        <div className="col-md-4">
          <OrganizatorForma />
        </div>

        <div className="col-md-4">
          <LokacijaForma />
        </div>

        <div className="col-md-4">
          <PosetilacForma />
        </div>
      </div>

      <DogadjajList />
    </div>
  );
}

export default App
