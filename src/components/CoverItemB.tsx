import styled, { StyledComponent } from "@emotion/styled";
import { ReactElement } from "react";
import { ArtistState } from "../redux/store/store";
import { useNavigate } from "react-router-dom";


export interface CoverItemBProps {
    artist: ArtistState
}

export default function CoverItemB(props: CoverItemBProps): ReactElement {

    const { photo, name, bio, location, _id } = props?.artist;

    const navigate = useNavigate();

    return (
        <>
            <Container 
                onClick={() => {
                    navigate(`artist_albums_page/${_id}`);
                }}
            >
                <Cover src={photo}>
                </Cover>

                <TextContainer>
                    <TextBox>
                        <TextBold>{name}</TextBold>
                        <Text style={{ color: "grey", height: "20px" }}>{location}</Text>
                        <Text>{bio}</Text>
                    </TextBox>
                </TextContainer>
            </Container>
        </>
    );
}

const Container: StyledComponent<"div", any> = styled.div`
    min-height: 325px;
    min-width: 135px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.16em;
    transition: ease-out 0.1s;
    cursor: pointer;
    
    @media only screen and (min-width: 1400px) {
        min-height: 400px;
        min-width: 240px;
    }
`;
const Cover: StyledComponent<"img", any> = styled.img`
    height: 120px;
    width: 125px;
    position: absolute;
    top: 25px;
    object-fit: contain;

    @media only screen and (min-width: 1400px) {
      height: 69%;
      width: 100%;
    }
`;
const TextContainer: StyledComponent<"div", any> = styled.div`
   position: absolute;
   height: 180px;
   width: 125px;
   bottom: 0;
   background-color: white;
   padding-left: 10px;
   padding-right: 10px;

   @media only screen and (min-width: 1400px) {
        min-height: 200px;
        min-width: 240px;
    }
`;
const Text: StyledComponent<"p", any> = styled.p`
    height: 100px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* number of lines to show */
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