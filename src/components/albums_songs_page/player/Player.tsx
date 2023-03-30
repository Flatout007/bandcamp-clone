
import { ReactElement, useRef } from "react";
import styled, { StyledComponent } from "styled-components";
import { ReactComponent as Play } from "../../../play.svg";
import { ReactComponent as Pause } from "../../../pause.svg";
import { ReactComponent as Skip } from "../../../skip.svg";
import { useSelector } from "react-redux";
import { PlayerState, RootState } from "../../../redux/store/store";

export interface PlayerProps {
    handleFirstTrack: any,
    firstTrack: any,
    audioRef: any,
    currentTrack: any,
    tracks: any,
    handleTitle: any,
    next: any,
    prev: any,
    time: any,
    setAudioTime: any,
    duration: any,
    progress: any,
    setProgress: any
}

export default function Player(props: PlayerProps): ReactElement {

    const playerState = useSelector((state: RootState): PlayerState => {
        return state.player;
    });

    const { isPlaying, currentTrack } = playerState;

    const progressBarRef = useRef<any>(null);

    function handleMouseDown(e: any): void {

        if (props.duration === "NaN:NaN")
            return;

        e.preventDefault();

        const progressBar = progressBarRef.current;
        const rect = progressBar.getBoundingClientRect();
        const containerWidth = progressBar.clientWidth;
        const clickX = Math.min(Math.max(e.clientX - rect.x, 0), containerWidth);
        const progressBarWidth = rect.width;
        const percent = (clickX / progressBarWidth) * 100;

        props.setAudioTime(() => percent);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    function handleMouseMove(e: any): void {

        if (props.duration === "NaN:NaN")
            return;

        const progressBar = progressBarRef.current;
        const rect = progressBar.getBoundingClientRect();
        const containerWidth = progressBar.clientWidth;
        const clickX = Math.min(Math.max(e.clientX - rect.x, 0), containerWidth);
        const progressBarWidth = rect.width;
        const percent = (clickX / progressBarWidth) * 100;

        props.setAudioTime(() => percent);

        if (!props.audioRef.current) return

        props.audioRef.current.currentTime = (percent / 100) * props.audioRef.current.duration;

    };

    function handleMouseUp(e: any): void {

        if (props.duration === "NaN:NaN")
            return;

        const progressBar = progressBarRef.current;
        const rect = progressBar.getBoundingClientRect();
        const containerWidth = progressBar.clientWidth;
        const clickX = Math.min(Math.max(e.clientX - rect.x, 0), containerWidth);
        const progressBarWidth = rect.width;
        const percent = (clickX / progressBarWidth) * 100;

        props.setAudioTime(() => percent);

        if (!props.audioRef.current) return

        props.audioRef.current.currentTime = (percent / 100) * props.audioRef.current.duration;

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    return (<div>
        <Container>
            <PlayContainer onClick={(): void => {
                props.handleFirstTrack(props.currentTrack || 0);
            }
            }>
                {isPlaying ?
                    <Pause style={{ height: "50%" }} />
                    :
                    <Play style={{ height: "50%" }} />
                }
            </PlayContainer>

            <TrackContainer>
                <SongInfo>{currentTrack ? props.handleTitle(currentTrack.title) : ""}</SongInfo>
                <SongLength> {props.duration !== "NaN:NaN" && props.time + '/' + props.duration}</SongLength>
                <Distance ref={progressBarRef}>
                    <Bar
                        onMouseDown={handleMouseDown}
                        style={{ left: `${props.progress}px` }}>
                    </Bar>
                </Distance>
            </TrackContainer>

            <SkipContainer>
                <Skip
                    onClick={() => props.prev()}
                    className="left" style={{ height: "70%", cursor: "pointer" }}></Skip>
                <Skip
                    onClick={() => props.next()}
                    style={{ height: "70%", cursor: "pointer" }}></Skip>
            </SkipContainer>
        </Container>
    </div>)
}

const Container: StyledComponent<"div", any> = styled.div`
    height: 5em;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    position: relative;
`;
const PlayContainer: StyledComponent<"div", any> = styled.div`
   height: 80%;
   width: 4em;
   background-color: white;
   display: flex;
   align-items: center;
   border: 1px solid #C4C4C4;
   margin-left: 5px;
   cursor: pointer;
`;
const TrackContainer: StyledComponent<"div", any> = styled.div`
   height: 90%;
   width: 60%;
`;
const SongInfo: StyledComponent<"p", any> = styled.p`
  font-size: 0.8rem;
  margin-top: 10px;
  display: inline; 

  &&:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const SongLength: StyledComponent<"span", any> = styled.span`
    color: #C4C4C4;
    font-size: 0.8rem;
    margin-left: 10px;
`;
const Distance: StyledComponent<"div", any> = styled.div`
    height: 0.8em;
    width: 100%;
    margin-top: 16px;
    border: 0.1em solid #C4C4C4;
`;
const Bar: StyledComponent<"div", any> = styled.div`
   height: 1em;
   background-color: #F5F5F5;
   width: 25px;
   position: relative;
   bottom: 2.35px;
   right: 0.1em;
   cursor: pointer;
   border: 0.1em solid #E2E2E2;
`;
const SkipContainer: StyledComponent<"div", any> = styled.div`
    height: 20px;
    width: 50px;
    position: relative;
    top: 14px;
    left: 14px;
    display: flex
`;



