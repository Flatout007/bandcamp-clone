
import { ReactElement, useEffect, useRef, useState } from "react";
import styled, { StyledComponent } from "styled-components";
import Player from "./player/Player";
import SongItem from "./SongItem";
import Profile from "../Profile";
import { useDispatch, useSelector } from "react-redux";
import { AlbumState, ArtistState, PlayerState, RootState } from "../../redux/store/store";
import { getAlbums, getTracks } from "../../redux/async_thunks/albumThunk";
import { useParams } from "react-router-dom";
import { ReactComponent as Play } from "../../play.svg";
import { ReactComponent as Pause } from "../../pause.svg";
import { getCurrentTrack, pauseTrack, playTrack, reset } from "../../redux/slices/playerSlice";
import { index } from "../../redux/async_thunks/artistThunk";

export interface SongsProps {
}

export default function Songs(props: SongsProps): ReactElement {

    const songs: Array<ReactElement> = [];

    const [currentSongIndex, setCurrentSongIndex] = useState<any>(-1);

    const [playbackStatus, setPlaybackStatus] = useState<"playing" | "paused" | "stopped">("stopped");

    const audioRef = useRef<HTMLAudioElement>(null);

    const albumState = useSelector((state: RootState): AlbumState => {
        return state.album;
    });

    const artistState = useSelector((state: RootState): ArtistState => {
        return state.artist;
    });

    const playerState = useSelector((state: RootState): PlayerState => {
        return state.player;
    });

    const [currentTrack, setCurrentTrack] = useState<any>(-1);

    const { tracks, albums } = albumState;

    const { artists } = artistState;

    const [audioTime, setAudioTime] = useState(0.0);

    const [progress, setProgress] = useState(0.0);

    const { id, artist_id } = useParams();

    const dispatch = useDispatch();

    let artist = null;

    let artistId = artist_id;

    let album = null;

    useEffect((): void => {
        dispatch<any>(getTracks(id));
        dispatch<any>(index(null));
        dispatch<any>(getAlbums());

    }, [id]);

    useEffect(() => {

        // clean up function to reset play state
        return () => {
            dispatch(reset(playerState.currentTrack));
        }

    }, []);


    async function playAudio(ref: HTMLAudioElement) {
        await ref.play();
    }

    const handleTime = (e: any): void => {

        if (!e) return;

        const currentTime = e.currentTarget.currentTime;
        const duration = e.currentTarget.duration;
        const newPosition = (currentTime / duration) * 220;

        setAudioTime(() => (currentTime / duration) * duration);
        setProgress(() => newPosition);
    };

    function handleTimeConversion(time: any): string | void {

        const duration = time;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        return formattedTime;
    }

    function handleClick(index: number): void {

        setCurrentTrack(index);
        dispatch(getCurrentTrack(tracks[index]));

        if (index === currentSongIndex) {
            if (playbackStatus === "playing") {
                audioRef.current?.pause();
                setPlaybackStatus("paused");
                dispatch(pauseTrack(tracks[index]));
            } else {
                playAudio(audioRef?.current as HTMLAudioElement)
                setPlaybackStatus("playing");
                dispatch(playTrack(tracks[index]));

                playAudio(audioRef?.current as HTMLAudioElement);
            }
        } else {
            setCurrentSongIndex(index);
            setPlaybackStatus("playing");
            dispatch(playTrack(tracks[index]));
            audioRef.current?.setAttribute("src", tracks[index].file as string)
            audioRef.current?.load();
            playAudio(audioRef?.current as HTMLAudioElement);
        }
    }

    function handleNextTrack() {

        if (currentSongIndex >= tracks.length - 1 && playbackStatus === "playing") {
            dispatch(getCurrentTrack(tracks[0]));
            setCurrentSongIndex(() => 0);
            setCurrentTrack(() => 0);

            audioRef.current?.setAttribute("src", tracks[0].file as string)
            audioRef.current?.load();
            playAudio(audioRef?.current as HTMLAudioElement);

        } else {
            if (playbackStatus === "playing") {
                dispatch(getCurrentTrack(tracks[currentSongIndex + 1]));
                setCurrentSongIndex((prevIndex: any) => prevIndex + 1);
                setCurrentTrack((prevIndex: any) => prevIndex + 1);

                audioRef.current?.setAttribute("src", tracks[currentSongIndex + 1].file as string)
                audioRef.current?.load();
                playAudio(audioRef?.current as HTMLAudioElement);
            }
        }
    }

    function handlePrevTrack() {

        if (currentSongIndex <= 0 && playbackStatus === "playing") {
            dispatch(getCurrentTrack(tracks[0]));
            setCurrentSongIndex(() => 0);
            setCurrentTrack(() => 0);

            audioRef.current?.setAttribute("src", tracks[0].file as string)
            audioRef.current?.load();
            playAudio(audioRef?.current as HTMLAudioElement);

        } else {
            if (playbackStatus === "playing") {
                dispatch(getCurrentTrack(tracks[currentSongIndex - 1]));
                setCurrentSongIndex((prevIndex: any) => prevIndex - 1);
                setCurrentTrack((prevIndex: any) => prevIndex - 1);

                audioRef.current?.setAttribute("src", tracks[currentSongIndex - 1].file as string)
                audioRef.current?.load();
                playAudio(audioRef?.current as HTMLAudioElement);
            }
        }
    }

    function handlePlayButtons(trackId: number): ReactElement {

        if (currentTrack === trackId) {

            if (playerState.isPlaying) {
                return <Pause style={{ height: "50%" }} />
            } else {
                return <Play style={{ height: "50%" }} />
            }
        } else {
            return <Play style={{ height: "50%" }} />
        }
    }

    function handleTitle(title: string): string {

        const splitTitle = title.split("-");

        const newTitle = splitTitle[splitTitle.length - 1];

        let result = "";

        for (let i = 0; i < newTitle.length; i++) {

            const character = newTitle[i];

            if (character === ".")
                break;

            result += character;
        }

        return result;
    }

    if (tracks && albums) {

        for (let i = 0; i < albums.length; i++) {

            const albumId = albums[i]?._id;

            if (id === albumId) {
                album = albums[i];
                break;
            }
        }
    }

    if (artists) {

        for (let i = 0; i < artists.length; i++) {

            const id = artists[i]?._id;

            if (artistId === id) {
                artist = artists[i];
                break;
            }
        }
    }

    if (tracks) {

        for (let i = 0; i < tracks.length; i++) {

            const track = tracks[i];

            songs.push(
                <div key={i} style={{ position: "relative", display: "flex" }}>
                    <PlayContainer onClick={(): void => {
                        handleClick(i);
                    }}>

                        {handlePlayButtons(i)}

                    </PlayContainer>
                    <SongItem title={handleTitle(track.title as string)} audioRef={audioRef} num={i} track={track} key={i} />
                </div>
            )
        }
    }

    return (<>
        <Container>
            <InnerContainer>
                <SongContainer>
                    <AlbumHeader>{album?.title}
                        <br></br>
                        <HeaderSpanA>by</HeaderSpanA><HeaderSpanB> {artist?.name}</HeaderSpanB></AlbumHeader>

                    <Player
                        handleTitle={handleTitle}
                        tracks={tracks}
                        audioRef={audioRef}
                        currentTrack={currentTrack && currentTrack > 0 ? currentTrack : 0}
                        handleFirstTrack={handleClick}
                        firstTrack={tracks[0]}
                        next={handleNextTrack}
                        prev={handlePrevTrack}
                        time={handleTimeConversion(audioTime)}
                        setAudioTime={setAudioTime}
                        duration={handleTimeConversion(audioRef.current?.duration)}
                        progress={progress}
                        setProgress={setProgress}
                    />

                    <SongBuyInfo>
                        <SongBuyH2>Digital Album</SongBuyH2>
                        <SongBuySpanA>Streaming + Download</SongBuySpanA>
                        <br></br>
                        <SongBuyP>Includes unlimited streaming via the free Bandcamp app, plus high-quality download in MP3, FLAC and more.</SongBuyP>
                        <SongBuyH3>Buy Digital Album <SongBuyH3SpanA>$11</SongBuyH3SpanA> <SongBuyH3SpanB>USD</SongBuyH3SpanB>  <SongBuyH3SpanC>or more</SongBuyH3SpanC>
                            <SongBuyH3SpanD>Send as Gift</SongBuyH3SpanD></SongBuyH3>
                    </SongBuyInfo>

                    <Tracks>

                        {songs}

                    </Tracks>

                    <ReleaseDate>released in {album?.year}</ReleaseDate>
                    <Copyright>&copy; all rights reserved</Copyright>
                </SongContainer>

                <CoverContainer>
                    <Artwork
                        src={album?.artwork as string} alt={"the 2003 album - fallen"} >
                    </Artwork>
                </CoverContainer>

                <Profile artist={artist as ArtistState} />

                <audio
                    ref={audioRef}
                    controls={false}
                    onTimeUpdate={(e) => handleTime(e)}
                    preload={"auto"}
                />
            </InnerContainer>
        </Container>
    </>)
}

const PlayContainer: StyledComponent<"div", any> = styled.div`
    max-width: 30px;
    height: 1.5em;
    /* position: absolute; */
    display: flex;
    justify-content: center;
    align-items: center;
    right: 350px;
    background-color: white;
    border: 1px solid #C4C4C4;
    cursor: pointer;
`;

const Container: StyledComponent<"div", any> = styled.div`
    display: flex;
    height: fit-content;
    width: 100%;
`;
const InnerContainer: StyledComponent<"div", any> = styled.div`
    height: 100vh;
    width: 95%;
    display: flex;
    justify-content: space-around;
    justify-content: center;
    display: flex;
    align-items: center;
`;
const SongContainer: StyledComponent<"div", any> = styled.div`
    height: 80%;
    width: 93%;
    margin-left: 10px;
`;
const HeaderSpanA: StyledComponent<"span", any> = styled.span`
   font-size: 1rem;
`;
const HeaderSpanB: StyledComponent<"span", any> = styled.span`
    font-size: 1rem;
    cursor: pointer;
    color: #0887F5;
`;

const AlbumHeader: StyledComponent<"header", any> = styled.header`
    font-size: 1.5rem;
    margin-bottom: 20px;
`;

const SongBuyInfo: StyledComponent<"div", any> = styled.div`
    font-size: 1rem;
    margin-top: 20px;
`;

const SongBuyH2: StyledComponent<"h2", any> = styled.h2`
    font-size: 1rem;
`;

const SongBuySpanA: StyledComponent<"span", any> = styled.span`
    font-size: 0.8rem;
    color: #C8C8C8;
    font-weight: 100;
`;

const SongBuyP: StyledComponent<"p", any> = styled.p`
    font-size: 0.8rem;
    font-weight: 500;
    margin-top: 5px;
`;

const SongBuyH3: StyledComponent<"div", any> = styled.div`
    font-size: 1.3rem;
    margin-top: 3px;
    color: #0887F5;
`;

const SongBuyH3SpanA: StyledComponent<"h2", any> = styled.h2`
    font-size: 1rem;
    display: inline;
    color: #363636;
`;
const SongBuyH3SpanB: StyledComponent<"h2", any> = styled.h2`
    font-size: 1rem;
    display: inline;
    color: #878997;
`;
const SongBuyH3SpanC: StyledComponent<"h2", any> = styled.h2`
    font-size: 1rem;
    display: inline;
    color: #878997;
    font-weight: 100;
    letter-spacing: -1px;
    font-size: 0.9rem;

`;
const SongBuyH3SpanD: StyledComponent<"h2", any> = styled.h2`
    font-size: 0.8rem;
    color: #0887F5;
    margin-top: 5px;
`;

const Tracks: StyledComponent<"ol", any> = styled.ol`
   margin-top: 10px;
`;

const ReleaseDate: StyledComponent<"h5", any> = styled.h5`
    font-weight: 100;
    margin-top: 25px;
`;

const Copyright: StyledComponent<"h5", any> = styled.h5`
    font-weight: 100;
    margin-top: 16px;
`;

const CoverContainer: StyledComponent<"div", any> = styled.div`
    height: 80%;
    width: 80%;
    margin-left: 5px;
`;

const Artwork: StyledComponent<"img", any> = styled.img`
    height: 35%;
    width: 100%;
`;