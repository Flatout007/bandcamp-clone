import styled, { StyledComponent } from "@emotion/styled";
import { ReactElement } from "react";
import { AlbumPayload } from "../types";
import CoverItemA from "./CoverItemA";

export interface CoverflowAProps {
    albums: Array<AlbumPayload>
}

export default function CoverflowA(props: CoverflowAProps): ReactElement {

    const coverItems: Array<ReactElement> = [];

    for (let i = 0; i < props?.albums.length; i++) {

        const album = props?.albums[i];

        coverItems[i] = <CoverItemA album={album} key={i}></CoverItemA>;
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
   }
`;
const Container: StyledComponent<"div", any> = styled.div`
      @media only screen and (min-width: 1400px) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
`;