
import { ReactElement, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { StyledComponent } from "styled-components";
import { AlbumPayload } from "../../types";

export interface CoverflowProps {
  album: AlbumPayload
}

export default function AlbumItem(props: CoverflowProps): ReactElement {

  const containerB = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const album = props.album;

  const { artwork, title, genre, _id } = album;

  function showContainerB(): void {
    containerB.current?.classList.remove("hide");
    containerB.current?.classList.add("show");
  }

  function hideContainerB(): void {
    containerB.current?.classList.remove("show");
    containerB.current?.classList.add("hide");
  }

  useEffect(() => {
    containerB.current?.classList.add("hide");
  }, []);

  return (
    <div>
      <Container>

        <img src={artwork as string} alt="album cover" style={{ position: "absolute", height: "55%", width: "75%" }} />

        <Cover
          onClick={() => {

          }}
          onMouseEnter={showContainerB}
          onMouseLeave={hideContainerB}
        >
          <ContainerB ref={containerB}>
            <AddSongs
              onClick={(): void => {
                navigate(`${_id}/tracks/new`);
              }}
            >Add Tracks
            </AddSongs>
            <Edit
              onClick={(): void => {
                navigate("./edit");
              }}
            >Edit
            </Edit>
            <Delete
              
            >Delete
            </Delete>
          </ContainerB>
        </Cover>

        <TextContainer>
          <TextBox>
            <TextBold>{title}</TextBold>
            <Text>{genre}</Text>
          </TextBox>
        </TextContainer>
      </Container>
    </div>
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
`;
const ContainerB: StyledComponent<"div", any> = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: ease-out 0.1s;
    cursor: pointer;
    height: max-content;
    width: max-content;
`;

const Cover: StyledComponent<"div", any> = styled.div`
    min-height: 150px;
    min-width: 130px;
    position: absolute;
    top: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const AddSongs: StyledComponent<"button", any> = styled.button`
    height: 2em;
    width: 6em;
    background-color: #1b74e8e6;
    color: white;
    border-radius: 0.8em;
    font-weight: 600;
    cursor: pointer;
    margin-top: 50%;
`;
const Edit: StyledComponent<"button", any> = styled.button`
    height: 2em;
    width: 6em;
    background-color: #1b74e8e6;
    margin-top: 5px;
    color: white;
    border-radius: 0.8em;
    font-weight: 600;
    cursor: pointer;
`;
const Delete: StyledComponent<"button", any> = styled.button`
    height: 2em;
    width: 6em;
    background-color: #1b74e8e6;
    margin-top: 5px;
    color: white;
    border-radius: 0.8em;
    font-weight: 600;
    cursor: pointer;
`;
const TextContainer: StyledComponent<"div", any> = styled.div`
   position: absolute;
   height: 100px;
   width: 125px;
   bottom: -16px;
   color: white;

   &:hover {
    text-decoration: underline;
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
  margin-top: 30px;
  margin-left: 3.5px;
`

