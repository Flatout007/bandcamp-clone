import { ReactElement } from "react";
import styled, { StyledComponent } from "styled-components";

export interface HeroComponentProps {
    photo: string
}

export default function HeroComponent(props: HeroComponentProps): ReactElement {
    return (
        <div>
            <Hero
                style={{
                    background: `url(${props?.photo}) no-repeat`,
                    
                }}>
            </Hero>
        </div>
    );
}

const Hero: StyledComponent<"div", any> = styled.div`
   height: 16em;
   width: 100%;
   background-position: 50% 30% !important;
`;

