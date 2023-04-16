import { ReactElement } from "react";
import MusicNCommunity from "../components/MusicNCommunity";
import SongsArea from "../components/albums_songs_page/SongsArea";
import ProfileNav from "../components/artist_albums_page/Nav";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArtistState, RootState } from "../redux/store/store";


export default function AlbumShow(): ReactElement {

    const { artist_id } = useParams();

    const artistState = useSelector((state: RootState): ArtistState => {
        return state.artist;
    });

    const { artists } = artistState;

    function getArtist(id: string): any {

        const artist = artists?.filter((artist: any): boolean => {
            return artist._id === id;
        });

        return artist;
    }

    const artist = getArtist(artist_id as string)[0];

    return (
        <>
            <div className="artist-photo-background" style={{background: `url(${artist?.photo})`}}>
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

