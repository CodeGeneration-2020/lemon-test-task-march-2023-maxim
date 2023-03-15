import styled from 'styled-components';
import { COLORS } from '../../theme';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    margin-bottom: 10px;
  }
`;

const ResultTitle = styled('div')<{ isWin: boolean }>`
  color: ${props => props.isWin ? COLORS.success : COLORS.error};
  font-weight: 700;
  font-size: 25px;
`;

const TopPlayersTitle = styled('div')`
  font-weight: 700;
  font-size: 25px;
`;

export const Styled = {
  Wrapper,
  ResultTitle,
  TopPlayersTitle,
}
