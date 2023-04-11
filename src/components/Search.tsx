import styled, { StyledComponent } from "styled-components";
import { SearchOutlined, SvgIconComponent } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { AlbumState, ArtistState, RootState } from "../redux/store/store";
import { BaseSyntheticEvent, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchComponent: React.FunctionComponent = (): ReactElement => {

    const [filter, setFilter] = useState('');

    const albumState = useSelector((state: RootState): AlbumState => {
        return state.album;
    });

    const artistState = useSelector((state: RootState): ArtistState => {
        return state.artist;
    });

    const { albums } = albumState;

    const { artists } = artistState;

    const navigate = useNavigate();

    const filteredAlbums = albums.filter(album =>
        album?.title?.toLowerCase().includes(filter.toLowerCase())
    );

    const filteredArtists = artists?.filter(artist =>
        artist?.name?.toLowerCase().includes(filter.toLowerCase())
    );

    function handleFilterChange(e: BaseSyntheticEvent): void {
        setFilter(e.target.value);
    };

    return (
        <Form>
            <NavSearch />

            <Input type="text" value={filter} onChange={handleFilterChange} placeholder="Search for artist, album, or track" />

            <SearchResultsContainer>

                {filteredAlbums?.map(({ artwork, title, genre, _id, artist_id }: any): any => {
                    if (filter)
                        return (<AlbumSearch>
                            <AlbumContainer
                            onClick={() => {
                                navigate(`/albums_songs_page/${_id}/${artist_id}`);
                            }}
                            >
                                <AlbumImage src={artwork}></AlbumImage>
                                <AlbumContents>
                                    <Name>{title}</Name>
                                    <Genre>{genre}</Genre>
                                </AlbumContents>
                            </AlbumContainer>
                        </AlbumSearch>);
                })}

                {filteredArtists?.map(({ photo, name, location, _id }: any): any => {
                    if (filter)
                        return (<AlbumSearch>
                            <AlbumContainer
                                onClick={(): void => {
                                    navigate(`/artist_albums_page/${_id}`);
                                }}
                            >
                                <AlbumImage src={photo}></AlbumImage>
                                <AlbumContents>
                                    <Name>{name}</Name>
                                    <Genre>{location}</Genre>
                                </AlbumContents>
                            </AlbumContainer>
                        </AlbumSearch>);
                })}

            </SearchResultsContainer>
        </Form>
    );
};

const Form: StyledComponent<"form", any> = styled.form`
    position: relative;
`;
const Input: StyledComponent<"input", any> = styled.input`
    height: 2.4em;
    position: relative;
    width: 100%;
    text-indent: 10px;
    cursor: pointer;
    color: rgba(22,17,19,0.7);
    background: #f3f3f3;
    border-radius: 0.2rem;

    &::placeholder {
        font-size: 0.71rem;
        letter-spacing: 0.01em;
    }

    &:focus {
        outline: none;
    }
`;

const NavSearch: StyledComponent<SvgIconComponent, any> = styled(SearchOutlined)`
    position: absolute;
    opacity: 0.3;
    left: 90%;
    top: 3px;
    z-index: 100;
`;

const SearchResultsContainer: StyledComponent<"div", any> = styled.div`
    width: 100%;
    height: max-content;
    max-height: 20em;
    background-color: #075b72f5;
    position: relative;
    z-index: 5000;
    overflow-y: scroll;    
`;

const AlbumSearch: StyledComponent<"li", any> = styled.li`
   height: 100px;
   width: 250px;
   background-color: white;
   border: 1px solid #408ea3;
   margin-left: auto;
   margin-right: auto;
   list-style: none;
   cursor: pointer;
   display: flex;
   justify-content: center;
   align-items: center;
`;
const AlbumImage: StyledComponent<"img", any> = styled.img`
   height: 100%;
   width: 25%;
   background-color: black;
`;
const AlbumContainer: StyledComponent<"div", any> = styled.div`
   height: 50px;
   width: 12em;
   display: flex;
   justify-content: start;
`;
const AlbumContents: StyledComponent<"div", any> = styled.div`
   width: 80%;
   height: 100%;
   padding-left: 10px;
   padding-right: 10px;
`;
const Name: StyledComponent<"p", any> = styled.p`
   font-weight: 600;
   font-size: 1rem;
   white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;
const Genre: StyledComponent<"p", any> = styled.p`
   font-size: 0.9rem;
`;

export default SearchComponent;
