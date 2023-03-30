import styled, { StyledComponent } from "@emotion/styled";
import { ReactElement } from "react";

export interface CoverItemBProps {
}

export default function CoverItemB(props: CoverItemBProps): ReactElement {
    return (
        <>
            <Container>
                <Cover style={{ background: "url(https://f4.bcbits.com/img/0030511344_170.jpg)", backgroundSize: "100% 100%" }}>
                </Cover>

                <TextContainer>
                    <TextBox>
                        <TextBold>The Hip Hop Show</TextBold>
                        <Text style={{ color: "grey", height: "20px" }}>RAP</Text>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper quis lectus nulla at volutpat. A cras semper auctor neque vitae tempus quam pellentesque nec. At imperdiet dui accumsan sit amet nulla. Nisl condimentum id venenatis a condimentum. Fermentum leo vel orci porta non pulvinar neque. Vulputate eu scelerisque felis imperdiet. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Id interdum velit laoreet id donec ultrices tincidunt. Donec et odio pellentesque diam volutpat commodo sed egestas. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Mauris pharetra et ultrices neque ornare. Velit dignissim sodales ut eu sem integer vitae justo eget. Tincidunt id aliquet risus feugiat. Donec adipiscing tristique risus nec feugiat in. Mauris augue neque gravida in fermentum et sollicitudin ac orci.
                            Ullamcorper morbi tincidunt ornare massa eget egestas purus. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Blandit aliquam etiam erat velit scelerisque in dictum non. Ac turpis egestas sed tempus urna et pharetra pharetra massa. Nunc consequat interdum varius sit amet. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Platea dictumst quisque sagittis purus sit amet volutpat consequat mauris. At imperdiet dui accumsan sit amet nulla facilisi. Sit amet nulla facilisi morbi tempus iaculis. Facilisi nullam vehicula ipsum a arcu cursus vitae. Feugiat in fermentum posuere urna nec tincidunt praesent. Dictum sit amet justo donec enim. Pharetra pharetra massa massa ultricies mi quis hendrerit. Ut diam quam nulla porttitor massa id neque aliquam vestibulum. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada. Nisl nisi scelerisque eu ultrices vitae auctor eu. Quam viverra orci sagittis eu volutpat odio. Ut tristique et egestas quis ipsum suspendisse ultrices. Est placerat in egestas erat. Posuere sollicitudin aliquam ultrices sagittis.
                            Amet risus nullam eget felis eget nunc. Leo vel orci porta non pulvinar. Enim praesent elementum facilisis leo vel. Purus gravida quis blandit turpis cursus in. Ut pharetra sit amet aliquam. Cras adipiscing enim eu turpis. Quis varius quam quisque id diam vel quam elementum pulvinar. Non arcu risus quis varius quam. Morbi tristique senectus et netus et malesuada fames. Dui id ornare arcu odio ut sem nulla pharetra diam. Egestas pretium aenean pharetra magna ac placerat vestibulum. Mauris cursus mattis molestie a iaculis. Vulputate dignissim suspendisse in est ante in nibh. Blandit libero volutpat sed cras ornare arcu. Eget sit amet tellus cras adipiscing. Consequat mauris nunc congue nisi vitae suscipit tellus mauris. Sed velit dignissim sodales ut eu sem integer vitae.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisi lacus sed viverra tellus in. Elementum tempus egestas sed sed risus. Amet aliquam id diam maecenas ultricies. Sem viverra aliquet eget sit amet. Sed id semper risus in hendrerit. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. </Text>
                    </TextBox>
                </TextContainer>
            </Container>
        </>
    );
}

const Container: StyledComponent<"div", any> = styled.div`
    min-height: 325px;
    min-width: 135px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.16em;
    transition: ease-out 0.1s;
    cursor: pointer;

    @media only screen and (min-width: 1400px) {
        min-height: 400px;
        min-width: 240px;
    }
`;
const Cover: StyledComponent<"div", any> = styled.div`
    min-height: 120px;
    min-width: 125px;
    position: absolute;
    top: 25px;

    @media only screen and (min-width: 1400px) {
        min-height: 200px;
        min-width: 240px;
    }
`;
const TextContainer: StyledComponent<"div", any> = styled.div`
   position: absolute;
   height: 180px;
   width: 125px;
   bottom: 0;
   background-color: white;

   @media only screen and (min-width: 1400px) {
        min-height: 200px;
        min-width: 240px;
    }
`;
const Text: StyledComponent<"p", any> = styled.p`
    font-size: 0.8rem;
    height: 100px;
    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;
`;
const TextBold: StyledComponent<"p", any> = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const TextBox: StyledComponent<"div", any> = styled.div`
  margin-top: 10px;
  margin-left: 3.5px;
`