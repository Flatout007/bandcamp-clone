
import { ReactElement } from "react";
import styled, { StyledComponent } from "styled-components";


export interface MusicNCommunityProps {
}

export default function MusicNCommunity(props: MusicNCommunityProps): ReactElement {
    return (
        <div>
            <ContainerOuter>
                <Container>

                    <MusicContainer>
                        <BarContainer>
                            <Bar style={{ height: '0.1em', width: "69px", position: "absolute" }}></Bar>
                        </BarContainer>
                        <MusicText>Music</MusicText>
                    </MusicContainer>

                    <CommunityContainer>
                        {/* <BarContainer>
                        <Bar style={{height: '0.1em', width: "100px", position: "absolute"}}></Bar>
                    </BarContainer> */}
                        <CommunityText>Community</CommunityText>
                    </CommunityContainer>
                </Container>
            </ContainerOuter>
        </div>
    );
}

const ContainerOuter: StyledComponent<"div", any> = styled.div`
    width: 100%;
    height: 2em;
    background-color: #212121;
    text-transform: uppercase;
`;
const Container: StyledComponent<"div", any> = styled.div`
    width: 20%;
    display: flex;
    justify-content: space-around;
    gap: 50px;
    margin-left: 16px;
    color: white;
`;
const MusicText: StyledComponent<"h5", any> = styled.h5`
    letter-spacing: -0.5px;
    margin-top: 5px;
`;
const CommunityText: StyledComponent<"h5", any> = styled.h5`
   letter-spacing: -1px;
   margin-top: 5px;
`;
const Bar: StyledComponent<"div", any> = styled.div`
   background-color: #4C7DD1;
`;

const BarContainer: StyledComponent<"div", any> = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`;

const CommunityContainer: StyledComponent<"div", any> = styled.div`
   
`;
const MusicContainer: StyledComponent<"div", any> = styled.div`
   
`;





