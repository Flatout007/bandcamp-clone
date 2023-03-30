import { PureComponent } from "react";
import MusicNCommunity from "../components/MusicNCommunity";
import ProfileNav from "../components/artist_albums_page/Nav";
import Albums from "../components/artist_albums_page/AlbumsArea";

export interface ArtistShowProps {
   
}

export default class ArtistShow extends PureComponent<ArtistShowProps> {

    public render() {
        return (
            <>
                <div style={{ backgroundColor: "#212121" }}>
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
