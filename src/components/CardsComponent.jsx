import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce';

const CardsComponent = ({ numCardsInput }) => {


  const [cards, setCards] = useState([]);
  const debounceValueNumCards = useDebounce(numCardsInput, 1000);


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

    debounceValueNumCards !== 0 ? fetchCards() : setCards([]);
    console.log("use efect")
  }, [debounceValueNumCards]);

  return (
    <>
      {cards.map((card) => (
        <img
          src={card.image}
          id={card.code}
          alt={card.code}

        />
      )

      )}
    </>


  );
};
export default CardsComponent;