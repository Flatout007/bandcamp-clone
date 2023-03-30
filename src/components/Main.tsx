import { ReactElement, useEffect } from "react";
import styled, { StyledComponent } from "@emotion/styled";
import CoverflowA from "./CoverflowA";
import CoverflowB from "./CoverflowB";
import CoverflowC from "./CoverflowC";
import Scroller from "./Scroller";
import { getAlbums } from "../redux/async_thunks/albumThunk";
import { index } from "../redux/async_thunks/artistThunk";
import { useSelector } from "react-redux";
import { AlbumState, ArtistState, RootState } from "../redux/store/store";

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

    // get last 5 albums
    const currentAlbums = albums.slice(albums.length-5, albums.length);

    useEffect((): void => {
    
    }, []);

    return (
        <main style={{
            backgroundColor: "#EFF2F3",
            width: "100%"
        }}>

            <Section1>
                <Container1>
                    <Text1>New Albums</Text1>
                    <CoverflowA albums={currentAlbums} />
                </Container1>
            </Section1>
            <Section2>
                <Container2>
                    <Text1>Lorem Espim</Text1>
                    <Scroller></Scroller>
                    <CoverflowB></CoverflowB>
                </Container2>
            </Section2>
            <Section3>
                <Container3>
                    <Text1>Lorem Espim</Text1>
                    <CoverflowC></CoverflowC>
                    <CoverflowB></CoverflowB>
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