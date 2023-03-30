import { ReactElement } from "react";
import styled, { StyledComponent } from "styled-components";

export interface DailyFormProps {
}

export default function DailyForm(props: DailyFormProps): ReactElement {
    return (
        <div>
            <Container>

                <FormTitle>
                    Get the best of Bandcamp Daily, delivered every Friday
                </FormTitle>

                <FormContainer>
                    <Form>
                        <Input placeholder="your email address">
                        </Input>
                    </Form>
                    <Button>
                        Sign Up
                    </Button>
                </FormContainer>
            </Container>
        </div>
    );
};
const Button: StyledComponent<"button", any> = styled.button`
    text-transform: uppercase;
    height: 30px;
    width: 115px;
    background-color: #23232392;
    margin-left: 10px;
    border-radius: 0.5em;
    color: white;
    font-size: 0.7rem;
`;
const FormContainer: StyledComponent<"div", any> = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
`;
const FormTitle: StyledComponent<"h2", any> = styled.h2`
   font-size: 0.98rem;
   font-weight: normal;
`;
const Container: StyledComponent<"div", any> = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f3f3f3;
    flex-direction: column;
    padding-bottom: 100px;
`;
const Form: StyledComponent<"form", any> = styled.form`
    position: relative; 
`;
const Input: StyledComponent<"input", any> = styled.input`
    height: 2.7em;
    position: relative;
    width: 300px;
    text-indent: 10px;
    cursor: pointer;
    color: rgba(22,17,19,0.7);
    border: 1px solid #16111339;
    border-radius: 0.2rem;

    &::placeholder {
        font-size: 0.71rem;
        letter-spacing: 0.01em;
    }

    &:focus {
        outline: none;
    }
`;

