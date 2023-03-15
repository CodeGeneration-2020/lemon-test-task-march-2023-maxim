import React, { FC, ReactNode } from 'react';
import { Styled } from './button.styled';

interface IButtonProps {
  children?: ReactNode,
  className?: string,
  onClick?: () => void,
}

export const Button: FC<IButtonProps> = ({ children, className, onClick }) => {
  return (
    <Styled.Button className={className} onClick={onClick}>
      { children }
    </Styled.Button>
  );
};
