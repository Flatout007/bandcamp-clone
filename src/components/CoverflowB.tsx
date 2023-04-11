import styled, { StyledComponent } from "@emotion/styled";
import { ReactElement } from "react";
import CoverItemB from "./CoverItemB";
import { ArtistState } from "../redux/store/store";

export interface CoverflowBProps {
    artists: Array<ArtistState>;
}

export default function CoverflowB(props: CoverflowBProps): ReactElement {

    const coverItems: Array<ReactElement> = [];

    for (let i = 0; i < props?.artists.length; i++) {

        const artist = props?.artists[i];

        if (artist.photo) {
            coverItems[i] = <CoverItemB key={i} artist={artist as ArtistState}></CoverItemB>;
        } else
            continue;
    }

    return (
        <div>
            <CoverContainer className="cover-container">

                {coverItems}

            </CoverContainer>
        </div>
    );
}

const CoverContainer: StyledComponent<"div", any> = styled.div`
   display: flex;
   margin-left: 16px;
   justify-content: start;
   gap: 0.5%;
   overflow-x: scroll;
   width: 690px;
   margin-left: auto;
   margin-right: auto;

   @media only screen and (min-width: 1400px) {
       width: 1271px;
       gap: 1.25%;
   }
`;