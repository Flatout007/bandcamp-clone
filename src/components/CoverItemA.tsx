import styled, { StyledComponent } from "@emotion/styled";
import { ReactElement } from "react";
import { AlbumPayload } from "../types";


export interface CoverItemAProps {
  album: AlbumPayload
}

export default function CoverItemA(props: CoverItemAProps): ReactElement {
  return (
    <>
      <Container>
        <Cover src={props?.album.artwork}>
        </Cover>

        <TextContainer>
          <TextBox>
            <TextBold>{props?.album.title}</TextBold>
            <Text>{props?.album.genre}</Text>
          </TextBox>
        </TextContainer>
      </Container>
    </>
  );
}

const Container: StyledComponent<"div", any> = styled.div`
    min-height: 250px;
    min-width: 135px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.16em;
    transition: ease-out 0.1s;
    cursor: pointer;

    @media only screen and (min-width: 1400px) {
        height: 300px;
        width: 280px;
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
   height: 100px;
   width: 125px;
   bottom: 0;

   @media only screen and (min-width: 1400px) {
      bottom: -30px;
    }
`;
const Text: StyledComponent<"p", any> = styled.p`
  font-size: 0.8rem;
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