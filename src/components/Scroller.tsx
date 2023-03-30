
import { ReactElement } from 'react';
import styled, { StyledComponent } from 'styled-components';

export interface ScrollerProps {
}

export default function Scroller(props: ScrollerProps): ReactElement {
  return (
    <>
      <Container>
        <Left>{">"}</Left>
        <Right>{"<"}</Right>
      </Container>
    </>
  );
}

const Container: StyledComponent<"div", any> = styled.div`

    height: 22px;
    width: 100px;
    position: absolute;
    right: 0;
    font-weight: bold;
    font-size: 0.75rem;
    border: 1px solid #408ea3;
    border-top-right-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
    border-top-left-radius: 0.3em;
    border-bottom-left-radius: 0.3em;
    color: #408ea3;
    
    @media only screen and (min-width: 1400px) {
      
    }
`;
const Left: StyledComponent<"div", any> = styled.div`
    border-top-right-radius: 0.3em;
    border-bottom-right-radius: 0.3em;

    height: 20px;
    width: 50%;
    position: absolute;
    border-left: 1px solid #408ea3;
    right: 0;
    display: flex;
    justify-content: center;

   @media only screen and (min-width: 1400px) {
      
    }
`;
const Right: StyledComponent<"div", any> = styled.div`
    border-top-left-radius: 0.3em;
    border-bottom-left-radius: 0.3em;
    
    height: 20px;
    width:  50%;
    position: absolute;
    display: flex;
    justify-content: center;

   @media only screen and (min-width: 1400px) {
      
    }
`;
