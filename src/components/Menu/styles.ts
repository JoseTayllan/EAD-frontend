import { Container as MuiContainer } from '@mui/material';
import styled from "styled-components";

export const Container = styled(MuiContainer).attrs({
    maxWidth: 'xl'
    })`
    margin: 0;
    padding: 0;

    width: 100%;
`;

export const Content = styled.div`
    display: flex;

    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;

    width: 100%;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  padding: 20px 10px 0 10px;
  gap: 5px;
  height: 100%;

  flex: 1;
`;

export const PopperContent = styled.div`
  background-color: ${({ theme }) => theme.foodExplorer.dark[1000]};
  padding: 1rem;
  margin: 1rem 2rem 0 0;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

export const HeaderPopperContent = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px ${({ theme }) => theme.foodExplorer.dark[400]} solid;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  font-weight: bold;
`;

export const BodyPopperContent = styled.div`
  display: flex;
  flex-direction: column;

  max-height: 600px;
  min-height: fit-content;
  max-width: 500px;
  min-width: 70vw;

  overflow: scroll;
`;

export const Footer = styled.div`
  padding-top: 20px;
  height: 200px;
  padding-left: -10px;
`;
