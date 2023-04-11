import styled, { StyledComponent } from "@emotion/styled";
import { ReactElement, useEffect, useState } from "react";
import { ArtistState } from "../redux/store/store";
import { useNavigate } from "react-router-dom";

export interface CarouselProps {
    artists: ArtistState[];
}

export default function Carousel({ artists }: CarouselProps): ReactElement {

    const smallItems: Array<ReactElement> = [];

    const [items, setItems] = useState<any>([]);

    const [positions, setPositions] = useState<any>({
        start: 0,
        end: 4
    });

    const navigate = useNavigate();

    const { start, end } = positions;

    useEffect((): void => {

        if (artists) {

            for (let i = 0; i < artists.length; i++) {

                const { photo, bio, location, name, _id } = artists[i];

                if (i === start) {
                    smallItems.push(
                        <Big 
                        
                        onClick={() => {
                            navigate(`/artist_albums_page/${_id}`)
                        }}
                        style={{
                            background: `url(${photo}) no-repeat`,
                        }}>
                            <BigTextContainer>
                                <BigText style={{ fontSize: "1.7em" }}>
                                    {name}
                                </BigText>

                                <BigText>
                                    {bio}
                                </BigText>

                                <p style={{ marginLeft: "16px", textShadow: "black 0px 0px 10px" }}>
                                    {location}
                                </p>

                            </BigTextContainer>
                        </Big>)
                } else {

                    smallItems.push(<Small 
                    
                        onClick={() => {
                            navigate(`/artist_albums_page/${_id}`);
                        }}
                    style={{
                        background: `url(${photo}) no-repeat`,

                    }} key={i}>
                        <SmallHover></SmallHover>
                        <SmallTextContainer>
                            <SmallText>
                                {name}
                            </SmallText>
                            <SmallText>
                                {location}
                            </SmallText>
                        </SmallTextContainer>
                    </Small>);
                }
            }
        }

        setItems((): Array<any> => {
            return [...smallItems.slice(start, end)];
        });

    }, [artists, start, end]);


    useEffect(() => {
        return (): void => {
            setPositions((): any => {

                return { start, end };
            });
        }
    }, []);

    useEffect((): void => {

        setTimeout((): void => {

            if (artists.length) {
                setPositions((prevPositions: any): any => {

                    let newStart = (prevPositions.start + 1) % artists.length;
                    let newEnd = (prevPositions.end + 1) % artists.length;

                    if (newStart >= newEnd) {
                        newEnd = newStart + 3;
                        newStart = 0;
                    }

                    if (newStart === 0 && newEnd !== 3) {
                        newEnd = 4;
                    }

                    return { start: newStart, end: newEnd };
                });
            }
        }, 30000);
    }, [start, end, artists.length]);

    return (
        <div>
            <Container>

                {items[0]}

                <SmallContainer>

                    {items.slice(1)}

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
   height: 100%;
   width: 100%;
   background-position: 50% 30% !important;
   cursor: pointer;
   
    @media only screen and (min-width: 1400px) {
        width: 45%;
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
    height: 33.3%;
    border: 1px solid black;
    width: 100%;
    background-size: cover !important;
    background-position: 50% 30% !important;
    cursor: pointer;
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
    overflow-x: hidden;
    text-shadow: black 0px 0px 10px;
    font-weight: 600;
`;

