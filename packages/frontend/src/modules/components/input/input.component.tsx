import React, { FC, ChangeEvent } from 'react';
import { Styled } from './input.styled';

interface IInputProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  value?: string
}

export const Input: FC<IInputProps> = ({ onChange, value }) => {
  return (
    <Styled.Input
      type='text'
      onChange={onChange}
      value={value}
    />
  );
};
