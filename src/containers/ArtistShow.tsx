import { PureComponent } from "react";
import MusicNCommunity from "../components/MusicNCommunity";
import ProfileNav from "../components/artist_albums_page/Nav";
import Albums from "../components/artist_albums_page/AlbumsArea";


export default class ArtistShow extends PureComponent {

    public render() {
        return (
            <>
                <div style={{background: "#212121"}}>
                    <main className='artist-profile'>
                        <section>
                            <ProfileNav></ProfileNav>
                        </section>

                        <section>
                            <MusicNCommunity></MusicNCommunity>
                        </section>

                        <section>
                            <Albums></Albums>
                        </section>
                    </main>
                </div>
            </>
        );
    }
}
