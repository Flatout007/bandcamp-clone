import styled, { StyledComponent } from "@emotion/styled";
import { ReactElement } from "react";
import CoverItemB from "./CoverItemB";

export interface CoverflowBProps {
}

export default function CoverflowB(props: CoverflowBProps): ReactElement {

    const coverItems: Array<ReactElement> = [];

    for (let i = 0; i <= 20; i++) {
        coverItems[i] = <CoverItemB key={i}></CoverItemB>;
    }

    return (
        <div>
            <CoverContainer>
                {coverItems}
            </CoverContainer>
        </div>
    );
}

const CoverContainer: StyledComponent<"div", any> = styled.div`
   display: flex;
   margin-left: 16px;
   justify-content: center;
   gap: 0.5%;
   overflow: hidden;
   width: 690px;
   margin-left: auto;
   margin-right: auto;

   @media only screen and (min-width: 1400px) {
       width: 1271px;
       gap: 1.25%;
   }
`;
const Container: StyledComponent<"div", any> = styled.div`
      @media only screen and (min-width: 1400px) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
`;