
import { SearchOutlined, SvgIconComponent } from "@material-ui/icons";
import { BaseSyntheticEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled, { StyledComponent } from "styled-components";
import { ReactComponent as ProfileLogo } from "../../profile-logo.svg";
import { AlbumState, ArtistState, ModalState, RootState } from "../../redux/store/store";
import { openLoginModal, openSignUpModal } from "../../redux/slices/modalSlice";
import { AlbumPayload, ArtistPayload } from "../../types";
import Hero from "./Hero";
import SignUpModal from '.././modals/Signup';
import LoginModal from '.././modals/Login';

export default function ProfileNav(): ReactElement {

    const [filter, setFilter] = useState('');

    const albumState = useSelector((state: RootState): AlbumState => {
        return state.album;
    });

    const artistState = useSelector((state: RootState): ArtistState => {
        return state.artist;
    })

    const { albums } = albumState;

    const { artists, artist } = artistState

    const filteredAlbums = albums.filter(album =>
        album?.title?.toLowerCase().includes(filter.toLowerCase())
    );

    const filteredArtists = artists?.filter(artist =>
        artist?.name?.toLowerCase().includes(filter.toLowerCase())
    );

    const navigate = useNavigate();

    const modalState = useSelector((state: RootState): ModalState => {
        return state.modal;
    });

    const { loginModalStatus, signupModalStatus } = modalState;

    const { id, artist_id } = useParams();

    useEffect(() => {
        // if params changes, set search filter to empty string
        setFilter(() => "");
    }, [id, artist_id]);

    const dispatch = useDispatch();

    let photo: string = "";

    function handleFilterChange(e: BaseSyntheticEvent): void {
        setFilter(e.target.value);
    };

    if (artists && id) {

        for (let i = 0; i < artists.length; i++) {

            const mainId = artist_id ? artist_id : id
            const artist = artists[i];

            if (mainId === artist?._id) {
                photo = artist?.photo;
            }
        }
    }

    return (
        <div>
            <Container>

                <FormContainer>
                    <SvgContainerOuter>
                        <SvgContainer>
                            <ProfileLogo style={{ transform: "scale(1.1)" }} />
                        </SvgContainer>
                    </SvgContainerOuter>

                    
                        {signupModalStatus && <SignUpModal />}
                        {loginModalStatus && <LoginModal />}
                    

                    <Form>
                        <NavSearch />
                        <Input onChange={handleFilterChange} placeholder="Search for artist, album, or track" />

                        <SearchResultsContainer>

                            {filteredAlbums?.map(({ artwork, title, genre, artist_id, _id }: AlbumPayload): any => {
                                if (filter)
                                    return (<AlbumSearch>
                                        <AlbumContainer onClick={() => {
                                            navigate(`/albums_songs_page/${_id}/${artist_id}`);
                                        }}>
                                            <AlbumImage src={artwork as string}></AlbumImage>
                                            <AlbumContents>
                                                <Name>{title}</Name>
                                                <Genre>{genre}</Genre>
                                            </AlbumContents>
                                        </AlbumContainer>
                                    </AlbumSearch>);
                            })}

                            {filteredArtists?.map(({ photo, name, location, _id }: ArtistPayload): any => {
                                if (filter)
                                    return (<AlbumSearch>
                                        <AlbumContainer onClick={() => {
                                            navigate(`/artist_albums_page/${_id}`)
                                        }}>
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
                </FormContainer>

                {
                    artist ?
                        <ProfileContainer>
                            <Edit onClick={(): void => {
                                navigate(`/artist/edit/${artist._id}`);
                            }}
                            >
                                edit profile
                            </Edit>
                            <AddPhoto
                                onClick={(): void => {
                                    navigate(`/artist/edit/photo/${artist._id}`);
                                }}
                            >
                                add photo
                            </AddPhoto>
                        </ProfileContainer>
                        :
                        <ProfileContainer>
                            <SignUpText
                                onClick={(): void => {
                                    dispatch<any>(openSignUpModal(null));
                                    console.log("hello")
                                }}
                            >
                                sign up
                            </SignUpText>
                            <LogInText
                                onClick={(): void => {
                                    dispatch<any>(openLoginModal(null));
                                }}
                            >
                                log in
                            </LogInText>
                        </ProfileContainer>
                }
            </Container>

            <Hero photo={photo}></Hero>
        </div>
    );
}

const Container: StyledComponent<"div", any> = styled.div`
     background-color: #212121;
     display: flex;
     justify-content: space-between;
`;

const SvgContainer: StyledComponent<"div", any> = styled.div`
    height: 20px;
    width: 160px;
    margin-left: 10px;
`;

const SvgContainerOuter: StyledComponent<"div", any> = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProfileContainer: StyledComponent<"div", any> = styled.div`
    width: 200px;
    height: 45px;
    display: flex;
    justify-content: space-around;
    color: white;
    font-size: 0.9rem;
    letter-spacing: -0.8px;
`;

const SignUpText: StyledComponent<"p", any> = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;
`;

const Edit: StyledComponent<"p", any> = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    color: white;
    color: white;
    font-size: 0.9rem;
    letter-spacing: -0.8px;
    cursor: pointer;
`;
const AddPhoto: StyledComponent<"p", any> = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    color: white;
    color: white;
    font-size: 0.9rem;
    letter-spacing: -0.8px;
    cursor: pointer;
`;

const LogInText: StyledComponent<"p", any> = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;
`;

const FormContainer: StyledComponent<"div", any> = styled.div`
    width: 450px;
    height: 45px;
    display: flex;
    justify-content: space-between;
`;
const Form: StyledComponent<"form", any> = styled.form`
    position: relative;
    width: 300px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Input: StyledComponent<"input", any> = styled.input`
    height: 80%;
    position: relative;
    width: 100%;
    text-indent: 10px;
    cursor: pointer;
    color: white;
    background: #383838;
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
    opacity: 0.5;
    left: 90%;
    top: 11px;
    z-index: 100;
    color: white;
`;
const SearchResultsContainer: StyledComponent<"div", any> = styled.div`
    width: 100%;
    height: max-content;
    max-height: 20em;
    top: 90%;
    background-color: #000000f3;
    position: absolute;
    z-index: 10000;
    overflow-y: scroll;    
`;

const AlbumSearch: StyledComponent<"li", any> = styled.li`
   height: 100px;
   width: 250px;
   background-color: #000000f6;
   border: 1px solid #0887F5;
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
   color: white;
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
