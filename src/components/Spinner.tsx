
import { ReactElement } from "react";
import styled, { StyledComponent } from "styled-components";

export function Spinner(): ReactElement {
    return (
        <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>  

            <AppLoading>
                    <SpinnerContainer>
                        <SpinnerTrail>
                            <SpinnerCircle></SpinnerCircle>
                        </SpinnerTrail>
                    </SpinnerContainer>
            </AppLoading>
        </div>
    );
}

const SpinnerCircle: StyledComponent<"div", any> = styled.div`
    width: 1.5em;
    height: 1.5em;
    background-color: #408ea3;
    border-radius: 100%;
    margin-left: 155px;
    margin-top: 8px;
`;
const SpinnerTrail: StyledComponent<"div", any> = styled.div`
  width: 8em,;
  height: 12em;
  border-top: 20px solid #408ea3;
  border-right: 20px solid transparent;
  border-radius: 50%;
  animation-name: spinner;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;
const SpinnerContainer: StyledComponent<"div", any> = styled.div`
   transform: scale(0.7);
`;
const AppLoading: StyledComponent<"div", any> = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    z-index: 500;
    position: absolute;
    background-color: white;
`;






