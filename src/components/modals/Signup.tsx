import styled, { StyledComponent } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { BaseSyntheticEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { closeSignUpModal, openLoginModal } from '../../redux/slices/modalSlice';
import { ArtistState, RootState } from '../../redux/store/store';
import { signup } from "../../redux/async_thunks/artistThunk";
import { ArtistPayload } from '../../types';
import { reset } from '../../redux/slices/artistSlice';

export interface SignInProps {
}

export default function SignIn(props: SignInProps): ReactElement {

    const dispatch = useDispatch();

    const dropAreaRef = useRef<HTMLDivElement>(null);

    const previewRef = useRef<HTMLImageElement>(null);

    const [formData, setFormData] = useState<ArtistPayload>({
        password: "",
        confirmedPassword: "",
        email: "",
        name: "",
        bio: "",
        file: null,
        fileName: "",
        location: "",
        photo: null
    });

    const artist = useSelector((state: RootState): ArtistState => {
        return state.artist;
    });

    const { confirmedPassword, email, password, name, bio, location, photo } = formData;

    const { isLoading, isError, isSuccess, message } = artist;

    useEffect(() => {

    }, []);

    useEffect(() => {

    }, [
        dispatch, confirmedPassword, email,
        password, formData, isLoading,
        isError, isSuccess, message, bio,
        location, photo
    ]);

    function preventDefaults(e: BaseSyntheticEvent): void {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(): void {
        dropAreaRef.current?.classList.add("highlight");
    }

    function unHighlight(): void {
        dropAreaRef.current?.classList.remove("highlight");
    }

    function handleDrop(e: DragEventInit): void {
        const data = e.dataTransfer;

        if (data) {
            const files = data.files;
            handleFiles(files);
        }
    }

    function handleFiles(files: FileList): void {

        for (let i = 0; i < files.length; i++) {

            // create a new object of the FileReader API
            const reader = new FileReader();
            const file = files[i];

            // read input as blob file
            reader.readAsDataURL(file);

            // after file has loaded to DOM
            reader.onload = (): void => {

                const preview = previewRef.current;
                const dropArea = dropAreaRef.current;

                if (preview && dropArea) {

                    // hide drop area and show preview of image
                    preview.classList.add("show");
                    preview.classList.remove("hide");
                    dropArea.style.display = "none";

                    // set result of reader to images's src attribute
                    preview.src = `${reader.result}`;
                    preview.alt = `${file.name}`

                    console.log(file);

                    // copy over prev state and append file to artist state
                    setFormData((prevState: ArtistPayload): ArtistPayload => {
                        const obj = {
                            ...prevState,
                            file,
                            fileName: file.name
                        };

                        return obj;
                    });
                }
            }
        }
    }

    function handleOnSubmit(e: BaseSyntheticEvent): void {
        e.preventDefault();

        // artist object that gets sent to redux, and then the body of the request
        const artist = {
            email, confirmedPassword,
            password, name, bio,
            location: formData.location,
            photo
        };

        if (confirmedPassword === password) {
            dispatch<any>(signup(artist));
        }
        else {
            alert("passwords do not match");
        }
    }

    function handleOnChange(e: BaseSyntheticEvent): void {
        const name = e.target.name;

        setFormData((currentPayload: ArtistPayload): ArtistPayload => {

            const artistPayload = {
                ...currentPayload,
                [name]: e.target.value
            };

            return artistPayload;
        });
    }

    function redirectToLogin(): void {
        dispatch(closeSignUpModal(null));
        dispatch(openLoginModal(null));
    }

    return (
        <ModalContainer>
            <ModalInnerContainer>

                <Close onClick={function (): void {
                    dispatch(closeSignUpModal(null));
                }}>X</Close>

                <HeaderContainer>
                    <SignInTextA>Sign Up</SignInTextA>
                    <Error>{message ? message : ""}</Error>
                    <SignInTextB>Already have an account?</SignInTextB>
                    <SignInTextC onClick={redirectToLogin}>Login</SignInTextC>
                </HeaderContainer>

                <Form method="POST"
                    onFocus={() => { dispatch<any>(reset(artist)) }}
                    onSubmit={(e: BaseSyntheticEvent) => { handleOnSubmit(e) }}
                    onChange={(e: BaseSyntheticEvent) => { handleOnChange(e) }}>
                    <EmailInput type="email" name="email" placeholder='Email Address'></EmailInput>
                    <NameInput type="text" name="name" placeholder='Name'></NameInput>
                    <PasswordInput type="location" name="location" placeholder='Location'></PasswordInput>
                    <LocationInput type="password" name="password" placeholder='Password'></LocationInput>
                    <ConfirmPassword type="password" name="confirmedPassword" placeholder='Confirm Password'></ConfirmPassword>
                    <Textarea placeholder='Tell us about your background ?' name="bio"></Textarea>

                    <SignUpButton>Sign Up</SignUpButton>
                </Form>

                <DropArea ref={dropAreaRef}

                    onDragEnter={(e: BaseSyntheticEvent): void => {
                        preventDefaults(e);
                        highlight();
                    }}
                    onDragOver={(e: BaseSyntheticEvent): void => {
                        preventDefaults(e);
                        highlight();
                    }}
                    onDragLeave={(e: BaseSyntheticEvent): void => {
                        preventDefaults(e);
                        unHighlight();
                    }}
                    onDrop={(e: BaseSyntheticEvent): void => {
                        preventDefaults(e);
                        unHighlight();
                        handleDrop(e);
                    }}
                >
                    <FileInput type="file" name="artwork" ></FileInput>
                    <HorizontalLine></HorizontalLine>
                    <H2>Drag and Drop Photo</H2>
                </DropArea>

                <Preview className="hide" ref={previewRef}></Preview>

                <HorizontalLine></HorizontalLine>

                <ProvidersContainer>
                    <GoogleSignIn></GoogleSignIn>
                </ProvidersContainer>

            </ModalInnerContainer>
        </ModalContainer>
    );
}

const ModalContainer: StyledComponent<"div", any> = styled.div`
    background-color: #ffffffc9;
    width: 100vw;
    height: 100vh;
    z-index: 120;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Close: StyledComponent<"h6", any> = styled.h6`
    font-size: 1.5rem;
    position: absolute;
    right: 10%;
    font-weight: 400;
    margin-top: 16px;
    cursor: pointer;
`;

const ModalInnerContainer: StyledComponent<"div", any> = styled.div`
    background-color: white;
    width: 30em;
    height: fit-content;
    position: relative;
    border-radius: 1em;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
const HeaderContainer: StyledComponent<"div", any> = styled.div`
   width: 100%;
   height: 5em;
   margin-top: 40px;
   margin-left: 16px;
`;
const SignInTextA: StyledComponent<"h1", any> = styled.h1`
    font-weight: 500;
`;
const Error: StyledComponent<"h6", any> = styled.h6`
    font-weight: 500;
    color: red;
`;
const SignInTextB: StyledComponent<"p", any> = styled.p`
   display: inline;
`;
const SignInTextC: StyledComponent<"p", any> = styled.p`
    margin-left: 5px;
    display: inline;
    color: #00A0F1;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;
const Form: StyledComponent<"form", any> = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    align-items: center;
    position: relative;
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
const PasswordInput: StyledComponent<"input", any> = styled.input`
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
const ConfirmPassword: StyledComponent<"input", any> = styled.input`
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
     width: 90%;
     min-height: 100px;
     margin-top: 16px;
     resize: vertical;
     border-radius: 1.5em;
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
const DropArea: StyledComponent<"div", any> = styled.div`
    width: 80%;
    height: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 1px grey dotted;
    flex-direction: column;
    margin-top: 16px;
    margin-left: auto;
    margin-right: auto;
`;
const FileInput: StyledComponent<"input", any> = styled.input`
    height: 2em;
    margin-bottom: 10px;
    margin-left: 16px;
`;
const Preview: StyledComponent<"img", any> = styled.img`
  background-color: black;
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
`;
const H2: StyledComponent<"h2", any> = styled.h2`
   font-size: 1rem;
   margin-top: 10px;
   color: #00A0F1;
`;
const SignUpButton: StyledComponent<"button", any> = styled.button`
   margin-left: auto;
   margin-right: auto;
   margin-top: 16px;
   height: 50px;
   width: 150px;
   border-radius: 2em;
   color: white;
   background-color: #1B73E8;
   font-weight: 600;
   font-size: 1rem;
   cursor: pointer;

   &:hover {
    transform: scale(105%);
    transition: 0.1s ease;
    font-size: 1rem;
   }
`;
const HorizontalLine: StyledComponent<"hr", any> = styled.hr`
  
   width: 35%;
   height: 0.05em;
   background-color: grey;
   margin-left: auto;
   margin-right: auto;
   margin-top: 16px;
   margin-bottom: 16px;

`;
const ProvidersContainer: StyledComponent<"div", any> = styled.div`
   display: flex;
   justify-content: center;
   width: 16em;
   flex-direction: column;
   margin-left: auto;
   margin-right: auto;
   margin-bottom: 16px;
`;
const GoogleSignIn: StyledComponent<"button", any> = styled.button`
   //max-width: 25em;
   height: 4em;
   background: url("https://cdn.sanity.io/images/ixpw9wpw/production/50f151dfb156b8c0bfbe868996aef3f6999574b2-382x92.png");
   cursor: pointer;
   //position: relative;
   background-size: 100% 100%;
   background-repeat: no-repeat;
    
   &:hover {
    transform: scale(105%);
    transition: 0.1s ease;
   }
`;

