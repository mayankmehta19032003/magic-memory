import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/html.jpeg", matched: false },
  { src: "/img/css.jpeg", matched: false },
  { src: "/img/javascript.jpeg", matched: false },
  { src: "/img/git.jpeg", matched: false },
  { src: "/img/python.jpeg", matched: false },
  { src: "/img/node.jpeg", matched: false },
  { src: "/img/mongoDB.jpeg", matched: false },
  { src: "/img/postgreSQL.jpeg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [disabled, setDisabled] = useState(false);

  //shuffle card
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) //The .sort() method works by comparing two elements at a time //Negative → Swap positions Positive → Keep the order Zero → No change
      .map((card) => ({ ...card, id: Math.random() })); // it will id to every object and copy its all property.

    
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //compare 2 selected cards 
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //start a new game automatically
  useEffect(()=>{
    shuffleCards();
  },[])

  return (
    <div className="App">
      <h1> TECH FLIP </h1>
      <button onClick={shuffleCards}>New Game 🔁</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
