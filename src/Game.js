import React, { useMemo } from "react";

function Game({ onCardClick, shuffledCards, difficult, openedCards, flipedCards }) {
  
  const getIsFlipped = (id, index) => {
    if (openedCards.includes(id)) return true;
    if (flipedCards.includes(index)) return true;
    return false;
  }
  const isGameEnded = useMemo (() => openedCards.length === difficult/2, [openedCards.length, difficult]);
    
        return (
          isGameEnded ? (
            <h2> ПОБЕДА-ПОБЕДА ВМЕСТО ОБЕДА! </h2>
          ) : (
          <div className = "cards">
              {shuffledCards.map(({id, image}, index) =>{
                return (
                  <div className = "card" key = {`${index}-${id}`}>
                    {getIsFlipped(id, index) ? (
                      <div className = "front">
                        {image}
                      </div>
                    ) : (
                      <div className = "back" onClick = {() => {onCardClick(id,index)}}/>
                    )}
                  </div>
                );
              })}
            </div>
          )
        );
}
export default Game;