import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce';

const CardsComponent = ({ numCardsInput }) => {


  const [cards, setCards] = useState([]);
  const debounceValueNumCards = useDebounce(numCardsInput, 1000);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCards = async () => {
      setError(null);

      try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${debounceValueNumCards}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setCards(data.cards);
      } catch (e) {
        setError( 'OCURRIO UN PROBLEMA CON EL SISTEMA, INTENTALO MÁS TARDE.');
        setCards([]);
      }
    };

    debounceValueNumCards !== 0 ? fetchCards() : setCards([]);
  }, [debounceValueNumCards]);

  return (
    <div>
      {error ? (
        <h1>{`ERROR: ${error}`}</h1>
      ) : (
        cards.map((card) => (
          <img
            key={card.code}
            src={card.image}
            alt={card.code}
            id={card.code}
          />
        ))
      )}
    </div>


  );
};
export default CardsComponent;