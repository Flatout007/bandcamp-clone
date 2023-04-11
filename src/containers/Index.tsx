import { PureComponent } from "react";
import Carousel from "../components/Carousel";
import Coverflow from "../components/Coverflow";
import DailyForm from "../components/DailyForm";
import Main from "../components/Main";
import NavComponent from "../components/Nav";


export default class Index extends PureComponent {
    public render() {
        return (
            <>
                <NavComponent></NavComponent>

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