import React, { useState } from 'react';
import { Styled } from './home.styled';
import { Button } from '../../components/button';
import { GameController } from '../../controllers/game.controller';
import { GameComponent } from '../../components/game';

const gameController = new GameController();

const HomePage = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const startHandler = async () => {
    await gameController.startGame();
    if (gameController.round !== 0) {
      setGameStarted(true);
    }
  }

  const resetGame = () => {
    gameController.reset();
    setGameStarted(false);
    startHandler();
  }

  return (
    <Styled.Wrapper>
      {!gameStarted && <Button onClick={startHandler}>
        Start game
      </Button>}
      {gameStarted && <GameComponent gameController={gameController} resetGame={resetGame} />}
    </Styled.Wrapper>
  );
};

export default HomePage;
