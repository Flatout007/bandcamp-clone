import { PureComponent } from "react";
import MusicNCommunity from "../components/MusicNCommunity";
import SongsArea from "../components/albums_songs_page/SongsArea";
import ProfileNav from "../components/artist_albums_page/Nav";

export interface AlbumShowProps {
}

export default class AlbumShow extends PureComponent<AlbumShowProps> {
    public render() {
        return (
            <>
                <div style={{ backgroundColor: "#212121"}}>
                    <main className='artist-profile'>
                        <section>
                            <ProfileNav></ProfileNav>
                        </section>

                        <section>
                            <MusicNCommunity></MusicNCommunity>
                        </section>

                        <section>
                            <SongsArea></SongsArea>
                        </section>
                    </main>
                </div>
            </>
        );
    }
}

