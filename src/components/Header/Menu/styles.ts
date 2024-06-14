import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  padding: 0;

  width: 100%;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const Content = styled.div`
    margin: 0;
    padding: 0;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    width: 100%;

    > .MenuImage {
        width: 40px;
        height: 40px;
    }

    > span {
        font-size: 1.5rem;
        font-weight: 600;
    }
`;
