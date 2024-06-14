import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;

  @media screen and (min-width: 768px) {
    height: 100vh;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 2rem;
  width: 100%;

  background: ${({ theme }) => theme.coead.light[100]};

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 0;
  }
`;

export const BrandCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media screen and (min-width: 768px) {
    background: ${({ theme }) => theme.coead.tints.mint[150]};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;

    > div {
      width: fit-content;
      margin-top: 0.6rem;
      margin-right: 0.5rem;
      padding: 12rem 5.3rem;
      background: ${({ theme }) => theme.coead.tints.mint[150]};
      border-radius: 16px;
    }
  }
`;

export const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 12vw;
  gap: 1rem;

  width: 100%;

  @media screen and (min-width: 768px) {
    background: ${({ theme }) => theme.coead.light[100]};
    background-size: cover;

    display: flex;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    flex: 1;

  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;

  margin-top: 4.5rem;

  > h1 {
    display: none;
  }

  @media screen and (min-width: 768px) {
    background: ${({ theme }) => theme.coead.tints.mint[150]};
    border-radius: 50%;
    margin-top: 0.5rem;
    padding: 2.4rem;

    width: 40vw;

    > h1 {
      display: block;
    }

    > :nth-child(2) {
      width: 80%;
    }

    > :nth-child(3) {
      width: 90%;
    }

    > :nth-child(4) {
      width: 95%;
    }
  }
`;
