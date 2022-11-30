import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      compareChoices(choiceOne, choiceTwo);
      // setTurns(turns+1);
    }
  }, [choiceOne, choiceTwo]);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    // console.log(card);
  };

  console.log(choiceOne, choiceTwo);

  const compareChoices = (choiceOne, choiceTwo) => {
    if (choiceOne.src === choiceTwo.src) {
      console.log("Matched");

      resetTurns();
    } else {
      console.log("Cards doesn't match");

      resetTurns();
    }
  };

  function resetTurns() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>

      <div className="turns">Turns: {turns}</div>
    </div>
  );
}

export default App;
