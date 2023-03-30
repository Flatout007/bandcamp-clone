import styled, { StyledComponent } from "@emotion/styled";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { AlbumPayload } from "../types";

export interface CoverItemProps {
  album: AlbumPayload
}

export default function CoverItem(props: CoverItemProps): ReactElement {

  const { album } = props;

  const { title, artwork, genre, _id, artist_id } = album;

  const navigate = useNavigate();

  function navigateToSongs(): void {
    navigate(`/albums_songs_page/${_id}/${artist_id}`);
  }

  return (
    <>
      <Container className="">
        <Cover
          src={artwork}
          onClick={(): void => {
            navigateToSongs();
           }
          }
        >
        </Cover>

        <TextContainer>
          <TextBox>
            <TextBold>{title}</TextBold>
            <Text>{genre}</Text>
          </TextBox>
        </TextContainer>
      </Container>
    </>
  );
}

const Container: StyledComponent<"div", any> = styled.div`
    min-height: 230px;
    min-width: 110px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.16em;
    transition: all ease-out 0.1s;
    cursor: pointer;

    &:hover {
      background-color: #8080801f;
      transform: scale(1.1);
    }
`;
const Cover: StyledComponent<"img", any> = styled.img`
    height: 120px;
    width: 110px;
    position: absolute;
    top: 25px;
    object-fit: cover;
`;
const TextContainer: StyledComponent<"div", any> = styled.div`
   position: absolute;
   height: 100px;
   width: 125px;
   bottom: 0;
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
  margin-top: 16px;
  margin-left: 10px;
`