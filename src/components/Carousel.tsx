import styled, { StyledComponent } from "@emotion/styled";
import { ReactElement } from "react";

export interface CarouselProps {
}

export default function Carousel(props: CarouselProps): ReactElement {
    return (
        <div>
            <Container>
                <Big style={{
                    background: "url('https://f4.bcbits.com/img/0030512038_171.jpg') no-repeat",
                    backgroundSize: "100% 100%"
                }}>
                    <BigTextContainer>
                        <BigText>
                            The Ephemeral Life of Blog Rap
                        </BigText>
                        <p style={{ marginLeft: "16px", textShadow: "black 0px 0px 10px" }}>
                            Rap
                        </p>
                    </BigTextContainer>
                </Big>
                <SmallContainer style={{}}>
                    <Small style={{
                        background: "url(https://f4.bcbits.com/img/0030495463_170.jpg) no-repeat",
                        backgroundSize: "100% 100%"
                    }}>
                        <SmallHover></SmallHover>
                        <SmallTextContainer>
                            <SmallText>
                                Lorem ipsum dolor sit amet
                            </SmallText>
                            <p style={{ marginLeft: "10px", textShadow: "black 0px 0px 10px" }}>Pop</p>
                        </SmallTextContainer>
                    </Small>
                    <Small style={{
                        background: "url('https://f4.bcbits.com/img/0030511344_170.jpg') no-repeat",
                        backgroundSize: "100% 100%"
                    }}>
                        <SmallHover></SmallHover>
                        <SmallTextContainer>
                            <SmallText>
                                The Hip Hop Show
                            </SmallText>
                            <p style={{ marginLeft: "10px", textShadow: "black 0px 0px 10px" }}>JPop</p>
                        </SmallTextContainer>
                    </Small>
                    <Small style={{
                        background: "url(https://f4.bcbits.com/img/0030470769_170.jpg) no-repeat",
                        backgroundSize: "100% 100%"
                    }}>
                        <SmallHover></SmallHover>
                        <SmallTextContainer>
                            <SmallText>
                                Ut enim ad minim veniam, quis
                            </SmallText>
                            <p style={{ marginLeft: "10px", textShadow: "black 0px 0px 10px" }}>Rap</p>
                        </SmallTextContainer>
                    </Small>
                </SmallContainer>
            </Container>
        </div>
    );
}

const Container: StyledComponent<"div", any> = styled.div`
    width: 100%;
    height: 25rem;
    background-color: #222222;
    position: relative;
    display: flex;
    justify-content: center;
   
    @media only screen and (min-width: 1400px) {
       height: 36rem;
    }
`;

const Big: StyledComponent<"div", any> = styled.div`
   height: 100%;
   width: 40em;
   position: relative;
   
    @media only screen and (min-width: 1400px) {
        width: 50%;
    }

    &:hover {
        transition: ease-in 0.1s;
        filter: brightness(105%);
    }
`;
const SmallContainer: StyledComponent<"div", any> = styled.div`
    min-width: 30%;
    position: relative;

    @media only screen and (min-width: 1400px) {
        min-width: 20%;
    }
`;
const Small: StyledComponent<"div", any> = styled.div`
    position: relative;
    min-height: 33.3%;
    border: 1px solid black;
`;
const SmallHover: StyledComponent<"div", any> = styled.div`
    position: absolute;
    z-index: 100;
    background-color: transparent;
    height: 100%;
    width: 100%;
    transition: ease-out 0.1s;

    &:hover {
        transition: ease-in 0.1s;
        background-color: #ffffff1a;
    }
`;
const BigTextContainer: StyledComponent<"div", any> = styled.div`
    width: 100%;
    height: 10em;
    position: absolute;
    bottom: 0;
    color: white;
    display: flex;
    flex-direction: column;
`;
const BigText: StyledComponent<"h4", any> = styled.h4`
    font-size: 1.5rem;
    position: relative;
    margin-top: 16px;
    margin-left: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-shadow: black 0px 0px 10px;
    font-weight: 700;

    @media only screen and (min-width: 1400px) {
        font-size: 2rem;
    }
`;
const SmallTextContainer: StyledComponent<"div", any> = styled.div`
    width: 100%;
    height: 3.5em;
    position: absolute;
    bottom: 3.5px;
    display: flex;
    color: white;
    flex-direction: column;
`;
const SmallText: StyledComponent<"p", any> = styled.p`
    margin-left: 10px;
    font-size: 1.1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-shadow: black 0px 0px 10px;
    font-weight: 600;
`;

