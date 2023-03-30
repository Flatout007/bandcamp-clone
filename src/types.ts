
/**@description represents the shape of the data submitted by the artist */
export type ArtistPayload = {
    email?: string,
    password?: string,
    name?: string,
    confirmedPassword?: string,
    bio?: string, 
    file?: Uint8Array | null | Blob | File | string,
    fileName?: string,
    url?: string,
    _id?: string,
    location?: string,
    photo?: any
}

/**@description represents the shape of the data submitted for the album */
export type AlbumPayload = {
    title?: string,
    file?: Uint8Array | null | Blob | File | string,
    artwork?: string | null
    genre: string,
    year: string
    artist_id: string,
    fileName: string,
    url: string,
    _id?: string,
}

/**@description represents the shape of the data submitted for the track */
export type TrackPayload = {
    titles: Array<string | null>
    tracks: Array<Uint8Array | null | Blob | File | string>
    artist_id: string,
    album_id: string,
    urls: Array<string>
    title?: string
    file?: Uint8Array | null | Blob | File | string,
    _id?: string
}