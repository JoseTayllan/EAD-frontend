import styled from 'styled-components';

export const Container = styled.footer`
  margin: 0;
  padding: 0;

  width: 100%;
`;

export const Content = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background-color: ${({ theme }) => theme.coead.tints.mint[150]}; 
  padding-left: 40px;

  width: 100%;
  height: 77px;
  border: 2px solid ${({ theme }) => theme.coead.tints.mint[800]};

  @media screen and (min-width: 768px) {
    gap: 20px;
  }
`;

export const CopyRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: 100%;

  > span {
    font-size: 14px;
    font-weight: 400;
  };

  @media screen and (min-width: 768px) {
    gap: 20px;
  }
`;