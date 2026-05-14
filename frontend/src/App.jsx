import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import DogadjajList from './components/DogadjajList'

function App() {
  return (
    <div className="container mt-4">
      <h1>Sistem za organizaciju događaja i rezervaciju mesta</h1>
      <DogadjajList />
    </div>
  );
}

export default App
