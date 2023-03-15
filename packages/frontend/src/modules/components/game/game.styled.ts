import styled from 'styled-components';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    margin-bottom: 10px;
  }
`;

const RoundTitle = styled('div')`
  font-weight: 700;
`;

export const Styled = {
  Wrapper,
  RoundTitle,
}
