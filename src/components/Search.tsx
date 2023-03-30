import styled, { StyledComponent } from "styled-components";
import { SearchOutlined, SvgIconComponent } from "@material-ui/icons";


interface SearchComponentProps {
}

const SearchComponent: React.FunctionComponent<SearchComponentProps> = (props) => {
    return (
        <Form>
            <NavSearch />
            <Input placeholder="Search for artist, album, or track">
            </Input>
        </Form>
    );
};

const Form: StyledComponent<"form", any> = styled.form`
    position: relative;
`;
const Input: StyledComponent<"input", any> = styled.input`
    height: 2.4em;
    position: relative;
    width: 100%;
    text-indent: 10px;
    cursor: pointer;
    color: rgba(22,17,19,0.7);
    background: #f3f3f3;
    border-radius: 0.2rem;

    &::placeholder {
        font-size: 0.71rem;
        letter-spacing: 0.01em;
    }

    &:focus {
        outline: none;
    }
`;

const NavSearch: StyledComponent<SvgIconComponent, any> = styled(SearchOutlined)`
    position: absolute;
    opacity: 0.3;
    left: 90%;
    top: 3px;
    z-index: 100;
`;


export default SearchComponent;
