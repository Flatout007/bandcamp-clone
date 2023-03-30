import axios, { AxiosResponse } from "axios";

// gets the artist that is signed to the request response cycle
function getSignedArtist() {
    const artist = localStorage.getItem("artist");

    const token = JSON.parse(artist as string)?.session?.sessionToken;

    const id = artist ? JSON.parse(artist)._id : "";

    return {
        artist,
        token,
        id
    }
}

// remove password and throw the signed artist in the redux store
function setSignedArtist(response: any) {
    delete response.data["password"];
    localStorage.setItem("artist", JSON.stringify(response.data));
    console.log("res: artist", response.artist);
}

export const signInArtist = async function (artistData: any): Promise<AxiosResponse> {

    const API_URL = "http://localhost:5000/artists/signin";

    const res = await axios({
        method: "post",
        url: API_URL,
        data: {
            email: artistData.email,
            password: artistData.password
        }
    });

    if (res && res.data) {
        setSignedArtist(res)
    }

    return res.data;
}

export const signUpArtist = async function (artistData: any): Promise<any> {

    const API_URL = "http://localhost:5000/artists/signup";

    const res = await axios({
        method: "post",
        url: API_URL,
        // data that is sent when creating a artist
        data: {
            email: artistData.email,
            password: artistData.password,
            name: artistData.name,
            bio: artistData.bio,
            location: artistData.location,
            photo: artistData.photo
        }
    });

    // delete password from artist object and store in local storage
    if (res && res.data) {
       setSignedArtist(res);
    }

    return res.data;
}

export const editArtist = async (artistPayload: any): Promise<AxiosResponse> => {

    const API_URL = `http://localhost:5000/artists/${artistPayload._id}`;

    const artist = getSignedArtist();

    const headers = {
        Authorization: `Bearer ${artist.token}`
    };

    const res = await axios.put(API_URL, artistPayload.artist, {
        headers
    });

    return res.data;
}

export const getAllAlbums = async function (): Promise<AxiosResponse> {

    const API_URL = "http://localhost:5000/albums";

    const res = await axios.get(API_URL);

    return res.data;
}

export const getArtistAlbums = async function (artistId: string): Promise<AxiosResponse> {

    const API_URL = `http://localhost:5000/artists/${artistId}`;

    const res = await axios.get(API_URL);

    return res.data;
}

export const getAllArtist = async function (): Promise<AxiosResponse> {

    const API_URL = `http://localhost:5000/artists/`;

    const res = await axios.get(API_URL);

    return res.data;
}

export const createAlbum = async function (albumPayload: any): Promise<AxiosResponse> {

    const API_URL = "http://localhost:5000/albums";

    const artist = getSignedArtist();

    const headers = {
        Authorization: `Bearer ${artist.token}`
    };

    const res = await axios.post(API_URL, albumPayload, {
        headers
    });

    return res.data;
}

export const editAlbum = async function (albumPayload: any): Promise<AxiosResponse> {

    const artist = getSignedArtist();

    const API_URL = `http://localhost:5000/albums/${artist.id}`;

    const headers = {
        Authorization: `Bearer ${artist.token}`
    };

    const res = await axios.put(API_URL, albumPayload, {
        headers
    });

    return res.data;
}

export const createTracks = async function (trackPayload: any): Promise<AxiosResponse> {

    const API_URL = "http://localhost:5000/tracks";

    const artist = getSignedArtist();

    const res = await axios.post(API_URL, trackPayload, {
        headers: {
            Authorization: `Bearer ${artist.token}`
        }
    });

    return res.data;
}

export const getAlbumTracks = async function (albumId: string): Promise<AxiosResponse> {

    const API_URL = `http://localhost:5000/albums/${albumId}`;

    const res = await axios.get(API_URL);

    return res.data;
}

