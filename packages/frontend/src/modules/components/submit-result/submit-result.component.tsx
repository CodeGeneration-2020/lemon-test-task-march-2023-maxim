import React, { useState, ChangeEvent, FC } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { GameController } from '../../controllers/game.controller';
import { Styled } from './submit-result.styled';
import { IUser } from '../../types/game.types';
import { TopUsers } from '../top-users';

interface ISubmitResultProps {
  isWin: boolean,
  gameController: GameController,
  resetGame: () => void,
}

export const SubmitResult: FC<ISubmitResultProps> = ({ isWin, gameController, resetGame }) => {
  const [username, setUsername] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [topUsers, setTopUsers] = useState<IUser[]>([]);

  const usernameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const onSubmit = async () => {
    const users = await gameController.submitResult(username, isWin);
    setTopUsers(users);
    setIsSubmitted(true);
  }

  const startNewGame = () => {
    resetGame();
  }

  return (
    <Styled.Wrapper>
      {!isSubmitted && <>
        <Styled.ResultTitle isWin={isWin}>{isWin ? 'You won!' : 'You lose'}</Styled.ResultTitle>
        <div>Enter your nickname:</div>
        <Input value={username} onChange={usernameOnChange} />
        <Button onClick={onSubmit}>Submit</Button>
      </>}
      {isSubmitted && <>
        <Styled.TopPlayersTitle>Top 3 Players</Styled.TopPlayersTitle>
        <TopUsers users={topUsers} />
        <Button onClick={startNewGame}>Start new game</Button>
      </>}
    </Styled.Wrapper>
  );
};
