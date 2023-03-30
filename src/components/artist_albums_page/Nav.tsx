
import { SearchOutlined, SvgIconComponent } from "@material-ui/icons";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled, { StyledComponent } from "styled-components";
import { ReactComponent as ProfileLogo } from "../../profile-logo.svg";
import { ArtistState, RootState } from "../../redux/store/store";
import Hero from "./Hero";

export interface ProfileNavProps {
}

export default function ProfileNav(props: ProfileNavProps): ReactElement {

    const artist = useSelector((state: RootState): ArtistState => {
        return state.artist;
    });

    const {artists} = artist;

    const navigate = useNavigate();

    const {id, artist_id} = useParams();

    let photo: string = "";

    if (artists) {
        
        for (let i = 0; i<artists.length; i++) {
            
            const mainId = artist_id ? artist_id : id
            const artist = artists[i];

            if (mainId === artist._id) {
                photo = artist.photo;
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

                    <Form>
                        <NavSearch />
                        <Input placeholder="Search for artist, album, or track">
                        </Input>
                    </Form>
                </FormContainer>

                {
                    artist ?
                        <ProfileContainer>
                            <Edit onClick={(): void => {
                                navigate(`/artist/edit/${artist.artist._id}`);
                            }}
                            >
                                edit profile
                            </Edit>
                            <AddPhoto
                                onClick={(): void => {
                                    navigate(`/artist/edit/photo/${artist.artist._id}`);
                                }}
                            >
                                add photo
                            </AddPhoto>
                        </ProfileContainer>
                        :
                        <ProfileContainer>
                            <SignUpText>sign up</SignUpText>
                            <LogInText>log in</LogInText>
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
