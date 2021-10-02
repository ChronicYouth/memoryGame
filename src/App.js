import React, { useCallback, useEffect, useState, useMemo } from 'react';
import './App.css';
import { IMAGES } from './assets/images';
import Game from './Game';
//import useSound from 'use-sound';
//import popIt from './sounds/popit.mp3';

function App() {
  const [difficult, setDifficult] = useState(null);
  const [firstClickItem, setFirstClickItem] = useState(null);
  const [openedCards, setOpenedCards] = useState([]);
  const [flipedCards, setFlipedCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);

  const numberByDifficult = useMemo(() => IMAGES.slice(0, difficult/2), [difficult]); // +
  const generateField = useCallback(() => {
    return [...numberByDifficult, ...numberByDifficult].sort(() => Math.random() - 0.5);
  }, [numberByDifficult]);
  const resetValues = () =>{
    setOpenedCards([]);
    setFlipedCards([]);
    setFirstClickItem(null);
  }
  const handleRestart = () => {
    setShuffledCards(generateField());
    resetValues();
  }
  useEffect(() => setShuffledCards(generateField()),[difficult, generateField]); 
  const handleCardClick = ((id, index) => {
    if (flipedCards.length === 2) {
      return;
    }
    if (firstClickItem === null) {
      setFirstClickItem({
        id,
        index
      });
      setFlipedCards((prevState) => [...prevState, index]);
      return;
    }
    if (firstClickItem.id === id && firstClickItem.index !== index) {
      setFirstClickItem(null);
      if (openedCards.indexOf(id) === -1){
        setOpenedCards((prevState) => [...prevState, id]); 
        setFlipedCards([]);
      }
      return;
    }
    setFirstClickItem(null);
    setFlipedCards((prevState) => [...prevState, index]);
    setTimeout(() => setFlipedCards([]), 500);
  });

  const handleChangeDifficult = useCallback((value) => {
    return () => {
      setDifficult(value);
      resetValues();
    }
  }, []);

  return (
    <div>
      <div className="container">
        <h1>Прикол :)</h1>
        <div>
          {!difficult ? (
            <div>
              <button onClick = {handleChangeDifficult(12)}>Лёгкая</button>
              <button onClick = {handleChangeDifficult(18)}>Средняя</button>
              <button onClick = {handleChangeDifficult(24)}>Сложная</button>
            </div>
          ) : (
            <div>
              <button onClick = {handleRestart}>
                Рестарт
              </button>
              <button onClick = {handleChangeDifficult(null)}>Главное меню</button>
            </div>
          )}
        </div>
        </div>

        {difficult ? (
          <Game 
            onCardClick = {handleCardClick}
            firstClickItem = {firstClickItem}
            shuffledCards = {shuffledCards}
            difficult = {difficult}
            openedCards = {openedCards}
            flipedCards = {flipedCards}
            />
        ) : (
          <h2>Выберите сложность!</h2>
        )}
    </div>
  );
}

export default App;
