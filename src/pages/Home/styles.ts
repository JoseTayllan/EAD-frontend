import { Grid } from '@mui/material';
import styled from 'styled-components';

interface ContentProps {
  $opened?: boolean;
}

export const Container = styled(Grid)<ContentProps>`
  margin: 0;
  padding: 0; 
  background-color: ${({ theme }) => theme.coead.tints.mint[1000]};  
  width: 100%;
  height: 100vh;

  > h2 {
    padding: 1.5rem 0 0 2rem;
  }

  @media screen and (min-width: 768px) {
    margin-left: ${({ $opened = true }) => ($opened ? '280px' : '64px')};
    width: ${({ $opened = true }) => ($opened ? 'calc(100% - 280px)' : 'calc(100% - 64px)')};
  }
`;

export const Content = styled(Grid)<ContentProps>`
  padding: ${({ $opened }) => ($opened ? '0' : '16px 16px 0')}; 

  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const CardsContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  gap: 1rem;
  flex-wrap: wrap;

  width: 100%;
  
`;

export const ChartsContainer = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 24px;
`;
