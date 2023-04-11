import styled, { StyledComponent } from "@emotion/styled";
import { ReactElement, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AlbumState, RootState } from "../redux/store/store";
import CoverItem from "./CoverItem";

export interface CoverflowProps {
}

export default function Coverflow(props: CoverflowProps): ReactElement {

    const album = useSelector((state: RootState): AlbumState => {
        return state.album;
    });

    const { albums } = album;

    const containerRef = useRef<HTMLDivElement>(null);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const albumRef = useRef<Array<any>>([]);

    let currentAlbums: Array<ReactElement> = [];

    const randomRange = (min: number, max: number): number => {
        return min + (max - min) * Math.random();
    }

    useEffect((): void => {
        // animates albums by setting intervals, and clicking a hidden
        // button that slides the albums.
        let interval = setInterval(() => {
            buttonRef.current?.click();
        }, randomRange(8000, 10000));

        containerRef.current?.addEventListener("mouseover", () => {
            clearInterval(interval);
        });

        containerRef.current?.addEventListener("mouseleave", () => {
            interval = setInterval(() => {
                buttonRef.current?.click();
            }, randomRange(8000, 10000));
        });

    }, []);

    function slide() {

        const container = containerRef.current;
        const album = albumRef.current;

        if (!album || !container)
            return;

        // remove last element, and put it in front
        const lastChild = container.lastChild as HTMLElement;

        container.removeChild(lastChild);
        container.insertBefore(lastChild, container.firstChild);
    }

    if (albums) {
        currentAlbums = albums?.map((album: any, i: number) => (
            <div className="album"
                key={i}
                style={{ position: "relative" }}
                ref={(el: any) => albumRef.current[i] = el}
            >
                <CoverItem
                    key={i}
                    album={album}
                />
            </div>));
    }

    return (
        <div style={{ height: "420px" }}>
            <Header>
                <HeaderText>Fans have paid artists <HeaderSpan>1.02 billion</HeaderSpan> $ using Bandcamp, and <HeaderSpan>$187 million</HeaderSpan> in the last year. </HeaderText>
            </Header>

            <button
                ref={buttonRef}
                style={{ display: "none" }}
                onClick={() => {
                    slide();
                }}
            >
            </button>

            <Container>
                <Message>
                    Selling right now
                </Message>
                <CoverContainer
                    id="DOMContainer"
                    className="container"
                    style={{ scrollBehavior: "smooth" }}
                    ref={containerRef}>

                    {currentAlbums}

                </CoverContainer>
            </Container>
        </div>
    );
}

const Header: StyledComponent<"header", any> = styled.header`
    height: 6em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
`;
const HeaderText: StyledComponent<"h4", any> = styled.h4`
    font-size: 1.1em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 35%;
`;
const HeaderSpan: StyledComponent<"span", any> = styled.span`
    font-weight: 900;
`;
const Message: StyledComponent<"p", any> = styled.p`
    color: #408ea3;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.95rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 40px;
    text-align: center;
   
    @media only screen and (min-width: 1400px) {
        text-align: left;
        min-width: 1250px;
    }
`;

const CoverContainer: StyledComponent<"div", any> = styled.div`
   display: flex;
   margin-left: 16px;
   justify-content: start; 
   gap: 1%;
   width: 773px;
   margin-left: auto;
   margin-right: auto;
   height: 250px;
   flex-shrink: 0;
   overflow: hidden;

   @media only screen and (min-width: 1400px) {
       width: 58% !important;
   }
`;
const Container: StyledComponent<"div", any> = styled.div`
      @media only screen and (min-width: 1400px) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
`;

