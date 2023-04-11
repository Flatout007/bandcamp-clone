import { ReactElement, useEffect } from "react";
import styled, { StyledComponent } from "@emotion/styled";
import CoverflowA from "./CoverflowA";
import CoverflowB from "./CoverflowB";
import CoverflowC from "./CoverflowC";
import Scroller from "./Scroller";
import { getAlbums } from "../redux/async_thunks/albumThunk";
import { index } from "../redux/async_thunks/artistThunk";
import { useDispatch, useSelector } from "react-redux";
import { AlbumState, ArtistState, RootState } from "../redux/store/store";
import Carousel from "./Carousel";
import Coverflow from "./Coverflow";
import { Spinner } from "./Spinner";

export interface MainProps {
}

export default function Main(props: MainProps): ReactElement {

    const artistState = useSelector((state: RootState): ArtistState => {
        return state.artist;
    });

    const albumState = useSelector((state: RootState): AlbumState => {
        return state.album;
    });

    const { artists } = artistState;

    const { albums } = albumState;

    const dispatch = useDispatch();

    // get last 5 albums
    const currentAlbums = albums?.slice(albums.length - 5, albums.length);

    // get last 5 artists
    const currentArtists = artists?.slice(artists.length - 8, artists.length);

    useEffect((): void => {
        // dispatches all artists to redux state
        dispatch<any>(index(null));

        dispatch<any>(getAlbums());
    }, []);

    if (artistState.isLoading || albumState.isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <main style={{
            backgroundColor: "#EFF2F3",
            width: "100%"
        }}>

            <section>
                <Carousel artists={artists as ArtistState[]}></Carousel>
            </section>

            <section>
                <Coverflow></Coverflow>
            </section>

            <Section1>
                <Container1>
                    <Text1>New Albums</Text1>
                    <CoverflowA albums={currentAlbums} />
                </Container1>
            </Section1>
            <Section2>
                <Container2>

                    <Text1>New Artists</Text1>
                    <Scroller></Scroller>

                    <CoverflowB artists={artists as ArtistState[]}></CoverflowB>
                </Container2>
            </Section2>
            <Section3>
                <Container3>
                    <Text1>Upcoming Artists</Text1>
                    <CoverflowC artists={currentArtists?.slice(0, 3) as Array<ArtistState>}></CoverflowC>
                    <CoverflowB artists={currentArtists?.slice(currentArtists.length - 5, currentArtists.length) as ArtistState[]}></CoverflowB>
                </Container3>
            </Section3>
        </main>
    );
}

const Section1: StyledComponent<"div", any> = styled.div`
    height: 25em;
    width: 100%; 
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Section2: StyledComponent<"div", any> = styled.div`
   height: 35em;
   width: 100%;
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
`;
const Section3: StyledComponent<"div", any> = styled.div`
    height: 60em;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Text1: StyledComponent<"p", any> = styled.p`
    width: 60%;
    position: absolute;
    color: #408ea3;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.95rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 40px;
    text-align: left;
    text-transform: uppercase;
   
    @media only screen and (min-width: 1400px) {
        text-align: left;
    }
`;
const Container1: StyledComponent<"div", any> = styled.div`
    height: 16em;
    display: flex;
    flex-direction: column;

    @media only screen and (min-width: 1400px) {
       width: 1271px;
    }
`;
const Container2: StyledComponent<"div", any> = styled.div`
    height: 25em;
    position: relative;

    @media only screen and (min-width: 1400px) {
       width: 1271px;
    }
`;
const Container3: StyledComponent<"div", any> = styled.div`
    height: 50em;
    position: relative;

    @media only screen and (min-width: 1400px) {
       width: 1271px;
    }
`;
