import styled, { StyledComponent } from "@emotion/styled";
import { ReactElement } from "react";
import CoverItemC from "./CoverItemC";
import { ArtistState } from "../redux/store/store";

export interface CoverflowCProps {
    artists: Array<ArtistState>;
}

export default function CoverflowC(props: CoverflowCProps): ReactElement {

    const coverItems: Array<ReactElement> = [];

    for (let i = 0; i < props?.artists.length; i++) {

        const { photo, name, location, bio } = props?.artists[i];

        if (i === 0) {
            coverItems[i] = (<Container key={i} className="cover">
                <Cover src={photo}>
                </Cover>

                <TextContainer>
                    <TextBox>
                        <TextBold>{name}</TextBold>
                        <Text style={{ color: "grey", height: "20px" }}>{location}</Text>
                        <Text>{bio}</Text>
                    </TextBox>
                </TextContainer>
            </Container>)
        } else {
            coverItems[i] = <CoverItemC artist={props?.artists[i] as ArtistState} key={i}></CoverItemC>;
        }
    }

    return (
        <div>
            <CoverContainer>

                {coverItems}

            </CoverContainer>
        </div>
    );
}
const Container: StyledComponent<"div", any> = styled.div`
    height: 325px;
    width: 395px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.16em;
    transition: ease-out 0.1s;
    cursor: pointer;
    left: -10%;

    @media only screen and (min-width: 1400px) {
        height: 420px;
        width: 750px;
        left: -12em;
    }
`;
const Cover: StyledComponent<"img", any> = styled.img`
     height: 100%;
    width: 120%;
    position: absolute;
    top: 25px;
    object-fit: contain;
    height: 100%;
    width: 100%;

    @media only screen and (min-width: 1400px) {
        height: 100%;
        width: 100%;
    } 
`;
const TextContainer: StyledComponent<"div", any> = styled.div`
   position: absolute;
   height: 90%;
   width: 200px;
   top: 25px;
   right: -16%;
   background-color: white;
   padding-left: 16px;
   padding-right: 16px;
   

   @media only screen and (min-width: 1400px) {
        
        min-width: 380px;
        right: -12em;
    }
`;
const Text: StyledComponent<"p", any> = styled.p`
    height: 120px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 5; /* number of lines to show */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    
`;
const TextBold: StyledComponent<"p", any> = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const TextBox: StyledComponent<"div", any> = styled.div`
  margin-top: 10px;
  margin-left: 3.5px;
`

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