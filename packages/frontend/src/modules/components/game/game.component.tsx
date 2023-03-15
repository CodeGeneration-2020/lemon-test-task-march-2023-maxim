import React, { FC, useState, ChangeEvent } from 'react';
import { GameController } from '../../controllers/game.controller';
import { Button } from '../button';
import { Input } from '../input';
import { SubmitResult } from '../submit-result';
import { Styled } from './game.styled';

interface IGameComponentProps {
  gameController: GameController
  resetGame: () => void
}

export const GameComponent: FC<IGameComponentProps> = ({ gameController, resetGame }) => {
  const [answer, setAnswer] = useState<string>('');
  const [isWin, setIsWin] = useState<boolean>(false);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [round, setRound] = useState<number>(gameController.round);

  const answerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  }

  const onSubmit = () => {
    const result = gameController.checkAnswer(answer);
    if (result.win) {
      setIsWin(true);
      setIsOver(true);
    } else {
      setRound(result.round);
      if (result.round > 5) {
        setIsOver(true);
      }
    }
  }

  return (
    <Styled.Wrapper>
      {!isOver &&
      <>
        <Styled.RoundTitle>{`Round: ${round}`}</Styled.RoundTitle>
        <div>{gameController.albums[round-1]}</div>
        <Input value={answer} onChange={answerOnChange} />
        <Button onClick={onSubmit}>Submit</Button>
      </>}
      {isOver && <SubmitResult isWin={isWin} gameController={gameController} resetGame={resetGame} />}
    </Styled.Wrapper>
  );
};
