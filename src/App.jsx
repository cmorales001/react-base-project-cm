import { useState, useEffect } from 'react'

import './App.css'

import CardComponent from './components/CardComponent'
import { useDebounce } from './hooks/useDebounce';

function App() {

  const [numCardsInput, setNumCardsInput] = useState(1);
  const [cards, setCards] = useState([]);
  const debounceValueNumCards=useDebounce(numCardsInput, 1000);

  const handleCardCountChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setNumCardsInput(value);
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${debounceValueNumCards}`);
        const data = await response.json();
        console.log(data)


        setCards(data.cards);
      } catch (e) {
        console.log(e);
      }
    };

    debounceValueNumCards!==0?fetchCards():setCards([]);
    console.log("use efect")
  }, [debounceValueNumCards]);


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
      {cards.map((card) => (
        <CardComponent
          id={card.code}
          title={card.code}
          imageUrl={card.image}
        />
      )

      )}

    </>
  )
}

export default App
