
import { ReactElement } from "react";
import styled, { StyledComponent } from "styled-components";
import { TrackPayload } from "../../types";

export interface SongItemProps {
  track: TrackPayload,
  key: number,
  num: number,
  audioRef: any,
  title: string
}

export default function SongItem(props: SongItemProps): ReactElement {

  return (
    <>
      <Container>
        <SongInfo> {props.title}</SongInfo>
      </Container>
    </>
  );
}

const Container: StyledComponent<"li", any> = styled.li`
    width: 90%;
    height: 1.5em;
    position: relative;
    margin-bottom: 10px;
    margin-left: 25px;

    &::marker {
      color: grey;
    }
`;

const SongInfo: StyledComponent<"p", any> = styled.p`
      color: #0887F5;
      font-size: 0.8rem;
`;