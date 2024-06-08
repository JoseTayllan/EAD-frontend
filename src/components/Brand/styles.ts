import { Container as MuiContainer } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(MuiContainer).attrs({
  maxWidth: 'xl',
})`
  margin: 0;
  padding: 0;

  width: 100%;

  gap: 10px;

  > span {
    margin: 0;
    padding: 0;

    font-weight: 700;
  };

  @media screen and (min-width: 768px) {
    display: flex;
    gap: 20px;
  }
`;
