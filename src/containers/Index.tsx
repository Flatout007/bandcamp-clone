import { PureComponent } from "react";
import Carousel from "../components/Carousel";
import Coverflow from "../components/Coverflow";
import DailyForm from "../components/DailyForm";
import Main from "../components/Main";
import NavComponent from "../components/Nav";

export interface IndexProps {
}

export default class Index extends PureComponent<IndexProps> {
    public render() {
        return (
            <>
                <NavComponent></NavComponent>

                <section>
                    <Carousel></Carousel>
                </section>

                <section>
                    <Coverflow></Coverflow>
                </section>

                <section>
                    <Main></Main>
                </section>

                <section>
                    <DailyForm></DailyForm>
                </section>
            </>
        );
    }
}