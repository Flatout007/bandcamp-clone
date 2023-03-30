import { ReactElement } from "react";

import styled, { StyledComponent } from "@emotion/styled";

function Logo(): ReactElement {

    return (
        <>
            <BlueLogo src="https://cdn.sanity.io/images/ixpw9wpw/production/df80140445e5475b7d80816f5ca98475dcca0f3f-96x96.png">
            </BlueLogo>
            <LogoText>bandcamp</LogoText>
        </>
    )
}

const BlueLogo: StyledComponent<"img", any> = styled.img`
    height: 2em;
    width: 2em;
`;

const LogoText: StyledComponent<"h1", any> = styled.h1`
    font-size: 1.4rem;
    font-weight: 600;
    position: absolute;
    left: 27.9px;
    z-index: 100;
    bottom: 0.5px;
`;

export default Logo;