import { useState, useEffect } from 'react'

import './App.css'

import CardsComponent from './components/CardsComponent'


function App() {

  const [numCardsInput, setNumCardsInput] = useState(0);

  const handleCardCountChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setNumCardsInput(value);
  };


  return (
    <>
      <h2>SOLICITA UN MASO DE CARTAS</h2>

      <div>
        <label htmlFor="cardCount">Número de Cartas: </label>
        <input
          id="cardCount"
          type="number"
          value={numCardsInput}
          onChange={handleCardCountChange}
          min="0"
          max="10"

        />
      </div>
      <CardsComponent
        numCardsInput={numCardsInput}
      />

    </>
  )
}

export default App
