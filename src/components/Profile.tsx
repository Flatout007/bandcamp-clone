import { ReactElement } from "react";
import styled, { StyledComponent } from "styled-components";
import { ArtistState } from "../redux/store/store";

export interface ProfileProps {
    artist: ArtistState
}

export default function Profile(props: ProfileProps): ReactElement {

    return (
        <>
            <ProfileContainer>
                <Picture src={props?.artist?.photo} alt=""></Picture>
                <ArtistNameText>{props?.artist?.name}</ArtistNameText>
                <LocationText>{props?.artist?.location}</LocationText>

                <FollowButton>
                    Follow
                </FollowButton>

                <BioText>
                    
                    {props?.artist?.bio}

                </BioText>
            </ProfileContainer>
        </>
    );
}

const ProfileContainer: StyledComponent<"div", any> = styled.div`
    height: 80%;
    width: 38%;
    color: #4C7DD1;
    margin-left: 10px;
`;
const Picture: StyledComponent<"img", any> = styled.img`
    height: 120px;
    width: 120px;
`;
const ArtistNameText: StyledComponent<"div", any> = styled.div`
   padding-right: 100px;
   margin-top: 5px;
   font-weight: 600;
`;
const LocationText: StyledComponent<"p", any> = styled.p`
   font-size: 0.8rem;
   margin-top: 1px;
   color: #FAA778;
`;
const FollowButton: StyledComponent<"button", any> = styled.button`
   width: 9em;
   height: 2em;
   background-color: #3A3A3A;
   color: white;
   border-radius: 0.3em;
   margin-top: 10px;
   border: 0.5px solid #212121;
   cursor: pointer;

   &:hover {
    text-decoration: underline;
   }
`;

const BioText: StyledComponent<"p", any> = styled.p`
   font-size: 0.8rem;
   padding-right: 40px;
   margin-top: 10px;
`;