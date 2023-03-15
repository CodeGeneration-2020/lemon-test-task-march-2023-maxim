import React, { FC } from 'react';
import { IUser } from '../../types/game.types';
import { Styled } from './top-users.styled';

interface ITopUsersProps {
  users: IUser[]
}

export const TopUsers: FC<ITopUsersProps> = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <Styled.Th>User</Styled.Th>
          <Styled.Th>Score</Styled.Th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.username}>
            <Styled.Td>{user.username}</Styled.Td>
            <Styled.Td>{user.score}</Styled.Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
