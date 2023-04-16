import styled, { StyledComponent } from 'styled-components';
import { ReactElement, useEffect } from 'react';
import Logo from './Logo';
import SearchComponent from './Search';
import SignUpModal from './modals/Signup';
import LoginModal from './modals/Login';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store/store';
import { openLoginModal, openSignUpModal } from '../redux/slices/modalSlice';
import { logout } from '../redux/async_thunks/artistThunk';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function NavComponent(): ReactElement {

  const { artist, isSuccess } = useSelector(function (state: RootState): any {
    return state.artist;
  });

  const { signupModalStatus, loginModalStatus } = useSelector(function (state: RootState): any {
    return state.modal;
  });

  const signedInArtistId = artist?._id;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {

  }, [isSuccess, artist, dispatch]);

  function notifyLogout(): void {
    toast("user logged out", {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#1B73E8',
        color: '#fff',
      },
      icon: '🚀',
    });
  }

  return (
    <div>

      {signupModalStatus && <SignUpModal></SignUpModal>}
      {loginModalStatus && <LoginModal></LoginModal>}

      <Nav>
        <Container>
          <InnerContainer>
            <div style={{ height: "2em", width: "40%" }}>
              <Logo></Logo>
            </div>
            <div style={{ height: "2em", width: "40%" }}>
              <SearchComponent />
            </div>
          </InnerContainer>

          <InnerContainer style={{ marginTop: "16px" }}>
            <div style={{
              height: "2em", width: "60%",
              display: "flex", alignItems: "center"
            }}>
              <Greeting>
                Discover amazing new music and <GreetingSpan>directly support</GreetingSpan> the artists who make it.
              </Greeting>
            </div>
            <div style={{
              height: "2em", width: "40%",
              display: "flex", alignItems: "center"
            }}>
              {
                !artist
                &&
                <>
                  <SignUp onClick={function (): void {
                    dispatch(openSignUpModal(null));
                  }}>signup</SignUp>

                  <Login onClick={function (): void {
                    dispatch(openLoginModal(null));
                  }}>login</Login>
                </>
              }

              {
                artist
                &&
                <>
                  <Profile onClick={(): void => {

                    navigate(`artist_albums_page/${signedInArtistId}`);
                  }} >profile</Profile>
                  <SignUp onClick={(): void => {
                    navigate("albums/new");
                  }}>add album</SignUp>

                  <Logout onClick={(): void => {
                    dispatch<any>(logout());
                    notifyLogout();
                  }}>logout</Logout>
                </>
              }
            </div>
          </InnerContainer>
        </Container>
      </Nav>`
    </div>
  );
}

const Profile: StyledComponent<"h3", any> = styled.h3`
  right: 155px;
  position: absolute;
  font-size: 0.8rem;
  cursor: pointer;
`

const Nav: StyledComponent<"nav", any> = styled.nav`
  width: 100%;
  height: 7em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container: StyledComponent<"div", any> = styled.div`
  width: 50em;
  height: 5em;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const InnerContainer: StyledComponent<"div", any> = styled.div`
  width:  100%;
  height: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
const Greeting: StyledComponent<"h1", any> = styled.h2`
  font-size: 0.8rem;
  font-weight: 600;
`;
const SignUp: StyledComponent<"h3", any> = styled.h3`
  right: 70px;
  position: absolute;
  font-size: 0.8rem;
  cursor: pointer;
`;
const Login: StyledComponent<"h3", any> = styled.h3`
  right: 16px;
  position: absolute;
  font-size: 0.8rem;
  cursor: pointer;
`;
const Logout: StyledComponent<"h3", any> = styled.h3`
  right: 16px;
  position: absolute;
  font-size: 0.8rem;
  cursor: pointer;
`;
const GreetingSpan: StyledComponent<"span", any> = styled.span`
  color: #408ea3;
  background: -webkit-linear-gradient(left, #6046FE, #1DA0C3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`


export default NavComponent;