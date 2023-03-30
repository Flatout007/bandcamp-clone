
import { ReactElement, useEffect } from "react";
import styled, { StyledComponent } from "styled-components";
import AlbumItem from "./AlbumItem";
import Profile from "../Profile";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums, index } from "../../redux/async_thunks/artistThunk";
import { ArtistState, RootState } from "../../redux/store/store";
import { useParams } from "react-router-dom";

export interface AlbumsProps {
}

export default function Albums(props: AlbumsProps): ReactElement {

    const albumsArray: Array<ReactElement> = [];

    const dispatch = useDispatch();

    let albumArtist = null;

    const artistState = useSelector((state: RootState): ArtistState => {
        return state.artist;
    });

    const {id} = useParams();

    const { artist, albums, artists } = artistState

    useEffect((): void => {
        dispatch<any>(getAlbums(artist._id));
        dispatch<any>(index(null));
    }, []); 

    if (albums) {
        for (let i = 0; i < albums.length; i++) {
            
            const album = albums[i];

            albumsArray.push(<AlbumItem album={album} key={i.toString()} />);
        }
    }

    if (artists) {
        for (let i = 0; i<artists.length; i++) {

            const artist = artists[i];

            if (id === artist._id) {
                albumArtist = artist;
                break;
            }
        }
    }

    return (
        <div>
            <Container>
                <InnerContainer>
                    <AlbumContainer>

                        {albumsArray}

                    </AlbumContainer>

                    <Profile artist={albumArtist as ArtistState}></Profile>
                </InnerContainer>
            </Container>
        </div>
    );
}

const Container: StyledComponent<"div", any> = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`;
const InnerContainer: StyledComponent<"div", any> = styled.div`
    height: 85%;
    width: 95%;
    display: flex;
    justify-content: space-around;
`;
const AlbumContainer: StyledComponent<"div", any> = styled.div`
    height: 100%;
    width: 80%;
    display: grid;
    grid-template-columns: repeat(4, 180px);
`;
