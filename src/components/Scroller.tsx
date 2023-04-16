import { ReactElement } from 'react';
import styled, { StyledComponent } from 'styled-components';

export interface ScrollerProps {
}

export default function Scroller(props: ScrollerProps): ReactElement {

  function left(): void {
    const container = document.querySelector(".cover-container");

    if (!container)
      return;

    container.scrollBy({ left: -200, behavior: "smooth" });
  }

  function right(): void {
    const container = document.querySelector(".cover-container");

    if (!container)
      return;

    container.scrollBy({ left: 200, behavior: "smooth" });
  }

  return (
    <>
      <Container>
        <Left onClick={() => {
          left();
        }}
        >
          {"<"}
        </Left>
        <Right
          onClick={() => {
            right();
          }}
        >
          {">"}
        </Right>
      </Container>
    </>
  );
}

const Container: StyledComponent<"div", any> = styled.div`

    height: 22px;
    width: 100px;
    font-weight: bold;
    font-size: 0.75rem;
    border: 1px solid #408ea3;
    border-top-right-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
    border-top-left-radius: 0.3em;
    border-bottom-left-radius: 0.3em;
    color: #408ea3;
    position: relative;
    left: 90%;
    display: flex;
    
    @media only screen and (min-width: 1400px) {
      
    }
`;
const Left: StyledComponent<"div", any> = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    cursor: pointer;
`;
const Right: StyledComponent<"div", any> = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    border-left: 1px solid #408ea3;
    cursor: pointer;
`;
