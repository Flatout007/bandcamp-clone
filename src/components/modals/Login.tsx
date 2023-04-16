import { BaseSyntheticEvent, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { StyledComponent } from 'styled-components';
import { closeLoginModal, openSignUpModal } from '../../redux/slices/modalSlice';
import { ArtistState, RootState } from '../../redux/store/store';
import { reset } from "../../redux/slices/artistSlice";
import { signin } from "../../redux/async_thunks/artistThunk";
import { ArtistPayload } from '../../types';
import toast from 'react-hot-toast';
import { GoogleAuthComponent } from '../GoogleSignIn';


export default function Login(): ReactElement {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState<ArtistPayload>({
        email: "",
        password: ""
    });

    const [loginFailed, setLoginFailed] = useState(false);

    const artist = useSelector((state: RootState): ArtistState => {
        return state.artist;
    });

    const { isLoading, isError, isSuccess, message } = artist;

    const notifyError = (): void => {

        const notification = message ? message : "An unknown error has occurred";

        toast(notification, {
            duration: 4000,
            position: 'top-right',
            style: {
                background: '#333',
                color: '#fff',
            },
            icon: '🚫',
        });
    }

    useEffect(() => {

        if (isSuccess) {
            dispatch(reset(artist));
            
        } else if (isError) {
            dispatch(reset(artist));
            notifyError();
            setLoginFailed((): boolean => true);
        }

    }, [isError, isSuccess, message, isLoading]);

    const { email, password } = formData;

    function redirectToSignUpModal(): void {
        dispatch(closeLoginModal(null));
        dispatch(openSignUpModal(null));
    }

    function handleOnSubmit(e: BaseSyntheticEvent): void {

        e.preventDefault();

        const artist = { email, password };

        dispatch<any>(signin(artist));
    }

    function handleOnChange(e: BaseSyntheticEvent): void {

        const name = e.target.name;

        setFormData((payload: ArtistPayload): ArtistPayload => {
            const obj = {
                ...payload,
                [name]: e.target.value
            }

            return obj;
        });
    }

    return (
        <>
            <ModalContainer>

                <ModalInnerContainer
                    className={loginFailed ? "shake" : ""}
                    onAnimationEnd={(): void => {
                        setLoginFailed((): boolean => false);
                    }}

                >
                    <Close onClick={(): void => {
                        dispatch(closeLoginModal(null));
                    }}>X</Close>

                    <HeaderContainer>
                        <LoginTextA>Sign In</LoginTextA>
                        <LoginTextB>New user?</LoginTextB>
                        <LoginTextC onClick={redirectToSignUpModal}>Create an account</LoginTextC>
                    </HeaderContainer>

                    <Form method="POST"
                        onSubmit={(e: BaseSyntheticEvent): void => {
                            handleOnSubmit(e);
                        }}
                        onChange={(e: BaseSyntheticEvent): void => {
                            handleOnChange(e);
                        }}>
                        <EmailInput type="email" placeholder='Email Address' name='email'></EmailInput>
                        <PasswordInput type="password" placeholder='Password' name='password'></PasswordInput>
                        <ForgotPassword>Forgot Password</ForgotPassword>

                        <SignInButton type="submit">Sign In</SignInButton>
                    </Form>

                    <HorizontalLineA></HorizontalLineA><Or>Or</Or>
                    <HorizontalLineB></HorizontalLineB>

                    <GoogleAuthComponent></GoogleAuthComponent>

                </ModalInnerContainer>

            </ModalContainer>
        </>
    );
}


const ModalContainer: StyledComponent<"div", any> = styled.div`
    background-color: #ffffffc9;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 120;
    position: absolute;
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
    height: 30em;
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
const LoginTextA: StyledComponent<"h1", any> = styled.h1`
    font-weight: 500;
`;
const LoginTextB: StyledComponent<"p", any> = styled.p`
   display: inline;
`;
const LoginTextC: StyledComponent<"p", any> = styled.p`
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
const ForgotPassword: StyledComponent<"p", any> = styled.p`
    position: absolute;
    top: 130%;
    left: 10%;
    color: #00A0F1;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;
const SignInButton: StyledComponent<"button", any> = styled.button`
   position: absolute;
   top: 120%;
   right: 10%;
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
const Or: StyledComponent<"p", any> = styled.p`
   position: absolute;
   left: 47.8%;
   top: 68%;
`;
const HorizontalLineA: StyledComponent<"hr", any> = styled.hr`
   position: absolute;
   width: 35%;
   height: 0.05em;
   background-color: grey;
   left: 10%;
   top: 70%;
`;
const HorizontalLineB: StyledComponent<"hr", any> = styled.hr`
   position: absolute;
   width: 35%;
   height: 0.05em;
   background-color: grey;
   right: 10%;
   top: 70%;
`;

