import { BaseSyntheticEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { StyledComponent } from "styled-components";
import { ArtistState, RootState } from "../../redux/store/store";
import { ArtistPayload } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { reset } from "../../redux/slices/artistSlice";
import { edit } from "../../redux/async_thunks/artistThunk";

export interface ArtistFormEditProps {
}

export default function ArtistFormEdit(props: ArtistFormEditProps): ReactElement {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { isLoading, isError, isSuccess, message } = useSelector((state: RootState): ArtistState => {
        return state.artist;
    });

    const artist = useSelector((state: RootState): ArtistState => {
        return state.artist.artist;
    });

    const { id } = useParams();

    const [formData, setFormData] = useState<ArtistPayload>({
        email: artist?.email,
        name: artist?.name,
        bio: artist?.bio,
        location: artist?.location
    });

    const { email, name, bio, location } = formData;

    useEffect(() => {
        if (isSuccess)
            resetAndRedirect();
    }, [isSuccess, message, email, name, bio, location]);

    function handleOnChange(e: BaseSyntheticEvent): void {

        const name = e.target.name;

        setFormData((prevState: ArtistPayload): ArtistPayload => {
            const obj = {
                ...prevState,
                [name]: e.target.value
            }

            return obj;
        });
    }

    function handleOnSubmit(e: BaseSyntheticEvent): void {
        e.preventDefault();

        const artist = { email, name, bio, location: formData.location }

        dispatch<any>(edit({ _id: id, artist }));
    }

    function resetAndRedirect(): void {
        dispatch<any>(reset(artist));
        navigate("/");
    }

    return (
        <Div>
            <Container>

                <H1>Edit your Profile</H1>

                <Form method="PUT"
                    onSubmit={(e: BaseSyntheticEvent): void => {
                        handleOnSubmit(e);
                    }}
                    onChange={(e: BaseSyntheticEvent): void => {
                        handleOnChange(e);
                    }}>
                    <EmailInput defaultValue={email} type="email" name="email"></EmailInput>
                    <NameInput defaultValue={name} type="text" name="name"></NameInput>
                    <LocationInput defaultValue={formData.location} name="location"></LocationInput>
                    <Textarea defaultValue={bio} name="bio"></Textarea>

                    <Button type="submit">Submit</Button>
                </Form>

            </Container>
        </Div>
    );
}
const Div: StyledComponent<"div", any> = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
`;
const Container: StyledComponent<"div", any> = styled.div`
    height: max-content;
    width: 65em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
const H1: StyledComponent<"h1", any> = styled.h1`
   font-size: 2rem;
   margin-top: 10px;
   margin-bottom: 100px;
   color: #00A0F1;
`;
const Form: StyledComponent<"form", any> = styled.form`
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 60%;
    align-items: center;
    gap: 10px;
`;
const EmailInput: StyledComponent<"input", any> = styled.input`
     width: 90%;
     height: 3em;
     margin-top: 16px;
     border-radius: 1.5em;
     background-color: #bdbec0;
     color: #757575;
     font-size: 1.05rem;
     text-indent: 16px;

     &:focus {
        outline: none;
        border: none;
     }
`;

const LocationInput: StyledComponent<"input", any> = styled.input`
     width: 90%;
     height: 3em;
     margin-top: 16px;
     border-radius: 1.5em;
     background-color: #bdbec0;
     color: #757575;
     font-size: 1.05rem;
     text-indent: 16px;

     &:focus {
        outline: none;
        border: none;
     }
`;
const NameInput: StyledComponent<"input", any> = styled.input`
     width: 90%;
     height: 3em;
     margin-top: 16px;
     border-radius: 1.5em;
     background-color: #bdbec0;
     color: #757575;
     font-size: 1.05rem;
     text-indent: 16px;

     &:focus {
        outline: none;
        border: none;
     }
`;
const Textarea: StyledComponent<"textarea", any> = styled.textarea`
     width: 88%;
     min-height: 116px;
     margin-top: 16px;
     resize: vertical;
     border-radius: 0.5em;
     background-color: #bdbec0;
     color: #757575;
     font-size: 1.05rem;
     text-indent: 16px;
     padding-top: 10px;

     &:focus {
        outline: none;
        border: none;
     }
`;
const Button: StyledComponent<"button", any> = styled.button`
   height: 50px;
   width: 150px;
   border-radius: 2em;
   color: white;
   background-color: #1B73E8;
   font-weight: 600;
   font-size: 1rem;
   margin-top: 16px;
   margin-bottom: 16px;
   cursor: pointer;

   &:hover {
    transform: scale(105%);
    transition: 0.1s ease;
    font-size: 1rem;
   }
`;