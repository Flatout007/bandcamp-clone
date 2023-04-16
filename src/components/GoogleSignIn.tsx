import { ReactElement, useEffect } from "react";
import styled, { StyledComponent } from "styled-components";
import { ArtistState, RootState } from "../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { UserCredential, signInWithPopup } from "firebase/auth";
import { auth, googleAuth } from "../services/firebase";
import { index, signin, signup } from "../redux/async_thunks/artistThunk";
import { closeLoginModal, closeSignUpModal } from "../redux/slices/modalSlice";
import { ArtistPayload } from "../types";

export function GoogleAuthComponent(): ReactElement {

    const artist = useSelector((state: RootState): ArtistState => {
        return state.artist;
    });

    const { artists, isSuccess } = artist;

    const dispatch = useDispatch();

    useEffect((): void => {
        if (isSuccess) {
            dispatch(closeSignUpModal(null));
            dispatch(closeLoginModal(null));
        }

    }, [isSuccess]);

    useEffect((): void => {
        dispatch<any>(index({}));
    }, []);

    function signIn(): void {

        signInWithPopup(auth, googleAuth).then((cred: UserCredential): any => {

            const google: any = {
                name: cred.user.displayName,
                email: cred.user.email,
                password: cred.user.uid,
                bio: "",
                location: cred.user.providerId,
                photo: cred.user.photoURL
            };

            const isArtistInDatabase = artists?.filter((ele: ArtistState | ArtistPayload): boolean => {
                return ele?.email === google?.email;
            })[0] != null;

            if (isArtistInDatabase) {
                dispatch<any>(signin({ email: google?.email, password: google?.password }));
            } else {
                dispatch<any>(signup(google));
            }
        });
    }

    return (
        <>
            <ProvidersContainer onClick={signIn}>
                <GoogleSignIn></GoogleSignIn>
            </ProvidersContainer>
        </>
    );
}

const ProvidersContainer: StyledComponent<"div", any> = styled.div`
   display: flex;
   justify-content: center;
   top: 30%;
   position: relative;
   width: 16em;
   flex-direction: column;
   margin-left: auto;
   margin-right: auto;
`;
const GoogleSignIn: StyledComponent<"button", any> = styled.button`
   max-width: 25em;
   height: 4em;
   background: url("https://cdn.sanity.io/images/ixpw9wpw/production/50f151dfb156b8c0bfbe868996aef3f6999574b2-382x92.png");
   cursor: pointer;
   position: relative;
   background-size: 100% 100%;
   background-repeat: no-repeat;
    
   &:hover {
    transform: scale(105%);
    transition: 0.1s ease;
   }
`;

