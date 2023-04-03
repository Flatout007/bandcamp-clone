
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../services/firebase";
import { BaseSyntheticEvent, ReactElement, useEffect, useRef, useState } from "react";
import styled, { StyledComponent } from "styled-components";
import { TrackPayload } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { create } from "../../redux/async_thunks/trackThunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState, TrackState } from "../../redux/store/store";
import { reset } from "../../redux/slices/trackSlice";

export default function TrackForm(): ReactElement {

    const dropAreaRef = useRef<HTMLInputElement>(null);

    const fileInputRef = useRef<any>(null);

    const { id, album_id } = useParams();

    const artist_id = id;

    const dispatch = useDispatch();

    const [formData, setFormData] = useState<TrackPayload>({
        tracks: [],
        titles: [],
        urls: [],
        artist_id: album_id as string,
        album_id: artist_id as string
    });

    const [loading, setLoading] = useState<any>({
        isLoading: false
    });

    const [submit, setSubmit] = useState<any>({
        isSubmittedToDatabase: false
    });

    const [fileCount, setFileCount] = useState<any>({
        count: 0
    });

    const [deleted, setFirebaseRefs] = useState<any>({
        references: []
    });

    const track = useSelector((state: RootState): TrackState => {
        return state.track
    });

    const { isSuccess } = track;

    const { tracks, titles, urls } = formData;

    const navigate = useNavigate();


    useEffect((): void => {

        handleSuccess();

        if (isSuccess) {
            dispatch(reset(track));
        }

        if (submit.isSubmittedToDatabase) {
            navigate("/");
        }

    }, [submit, isSuccess, track, urls]);

    useEffect(() => {

        return () => {
            setFormData(() => {
                return {
                    tracks: [],
                    titles: [],
                    urls: [],
                    artist_id: album_id as string,
                    album_id: artist_id as string
                }
            })
        }

    }, [album_id, artist_id])


    useEffect(() => {

        console.log(formData)
    }, [fileCount, formData, tracks, urls, titles, loading, deleted]);

    function preventDefaults(e: BaseSyntheticEvent): void {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(): void {
        dropAreaRef.current?.classList.add("highlight");
    }

    function unHighlight(): void {
        dropAreaRef.current?.classList.remove("highlight");
    }

    function handleChosenFiles(e: BaseSyntheticEvent): void {

        e.preventDefault();

        const fileInput = fileInputRef?.current

        if (fileInput && fileInput.files.length >= 1) {

            for (let i = 0; i < fileInput.files.length; i++) {

                const file = fileInput.files[i];

                setFormData((prevPayload: TrackPayload): TrackPayload => {
                    const obj = {
                        ...prevPayload,
                        tracks: [...prevPayload.tracks, file],
                        titles: [...prevPayload.titles, file.name]
                    };

                    return obj;
                });

                setFileCount((prevState: any): any => {
                    return { count: prevState.count + 1 }
                })
            }
        }
    }

    function handleDroppedFiles(files: FileList): void {

        for (let i = 0; i < files.length; i++) {

            // create a new object of the FileReader API
            const reader = new FileReader();
            const file = files[i];

            // read input as blob file
            reader.readAsDataURL(file);

            // after file has loaded to DOM
            reader.onload = (): void => {

                const dropArea = dropAreaRef.current;

                setFileCount((prevState: any): any => {
                    return { count: prevState.count + 1 }
                });

                if (dropArea) {

                    // copy over previous payload and append tracks and titles data to Track payload
                    setFormData((prevPayload: TrackPayload): TrackPayload => {
                        const obj = {
                            ...prevPayload,
                            tracks: [...prevPayload.tracks, file],
                            titles: [...prevPayload.titles, file.name]
                        };

                        return obj;
                    });
                }
            }
        }
    }

    function handleDrop(e: DragEventInit): void {
        const data = e.dataTransfer;

        if (data) {
            const files = data.files;
            handleDroppedFiles(files);
        }
    }

    async function deleteUploadedTracks() {

        for (let i = 0; i < deleted.references.length; i++) {

            const reference = deleted.references[i];

            await deleteObject(reference).then(() => console.log("deleted"));
        }

        // empty the references array after deletion
        deleted.references = [];
    }

    function handleUpload(e: BaseSyntheticEvent): void {

        e.preventDefault();

        setLoading(() => {
            const obj = {
                isLoading: true
            }

            return obj;
        });

        const uploadPromises = tracks.map((file, i) => {

            const reference = ref(storage, "tracks/" + titles[i]);
            const metadata = { contentType: "m4a", customMetadata: { name: titles[i] as string } };

            return uploadBytes(reference, file as any, metadata);
        })

        Promise.all(uploadPromises).then(async (snapshots: any): Promise<any> => {

            // wait for all urls to be downloaded to maintain track order due to asynchronicity
            const urls = await Promise.all(snapshots.map((snapshot: any) => getDownloadURL(snapshot.ref)));

            setFormData((prevPayload: any): any => {
                const obj = {
                    ...prevPayload,
                    urls
                };

                return obj;
            })

        });
    }

    function handleSubmit(e: BaseSyntheticEvent): void {
        e.preventDefault();

        // store files as downloadable URL strings, before sending to DB
        const tracksObject = {
            titles,
            files: urls,
            artist_id,
            album_id
        }

        console.log(tracksObject)

        if (tracksObject.files.length >= 1)
            dispatch<any>(create(tracksObject));
    }

    function handleSuccess() {
        if (isSuccess) {
            setSubmit(() => {
                return { isSubmittedToDatabase: true }
            });
        }
    }

    function handleButtons(): ReactElement {

        if (loading.isLoading && urls.length < fileCount.count) {
            return <Button type="submit">Please wait..</Button>
        }
        else if (urls.length >= fileCount.count) {
            return (
                <ButtonContainer>
                    <Button type="submit">Submit</Button>
                    {
                        deleted.references.length >= 1 &&
                        <Button
                            style={{ marginLeft: "16px" }}
                            onClick={(): void => {
                                deleteUploadedTracks();

                                setFileCount((): any => {
                                    return { count: 0 };
                                });

                                setFormData((): any => {
                                    return {
                                        tracks: [],
                                        titles: [],
                                        urls: []
                                    }
                                });

                                setLoading((): any => {
                                    return { isLoading: false }
                                });
                            }}
                        >Cancel
                        </Button>
                    }
                </ButtonContainer>
            )
        } else {
            return (
                <Button
                    onClick={(e): void => {
                        handleUpload(e);
                    }}
                >Upload Tracks
                </Button>)
        }
    }

    return (
        <Div>
            <Container>

                <H1>Upload Tracks</H1>

                {
                    fileCount.count ?
                        <Count>

                            {fileCount.count}

                            <span style={{ color: "black", marginLeft: "10px" }}>files</span>
                        </Count>
                        :
                        <></>
                }

                <Form method="POST"
                    onSubmit={(e: BaseSyntheticEvent): void => {
                        handleSubmit(e);
                    }}
                >
                    {!(urls.length >= 1) &&
                        <DropArea ref={dropAreaRef}

                            onDragEnter={(e: BaseSyntheticEvent): void => {
                                preventDefaults(e);
                                highlight();
                            }}
                            onDragOver={(e: BaseSyntheticEvent): void => {
                                preventDefaults(e);
                                highlight();
                            }}
                            onDragLeave={(e: BaseSyntheticEvent): void => {
                                preventDefaults(e);
                                unHighlight();
                            }}
                            onDrop={(e: BaseSyntheticEvent): void => {
                                preventDefaults(e);
                                unHighlight();
                                handleDrop(e);
                            }}
                        >
                            <FileInput ref={fileInputRef}
                                onChange={(e: BaseSyntheticEvent): void => {
                                    handleChosenFiles(e);
                                }}
                                className="file-input" type="file" name="tracks" multiple></FileInput>
                            <HorizontalLine></HorizontalLine>
                            <H2>Drag and Drop Files</H2>
                        </DropArea>
                    }


                    {handleButtons()}
                </Form>

            </Container>
        </Div>
    )
}

const ButtonContainer: StyledComponent<"div", any> = styled.div`
    display: flex;
`

const Div: StyledComponent<"div", any> = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
`;
const Container: StyledComponent<"div", any> = styled.div`
    height: max-content;
    width: 65em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
const H1: StyledComponent<"h1", any> = styled.h1`
   font-size: 2rem;
   margin-top: 10px;
   margin-bottom: 100px;
   color: #00A0F1;
`;
const Form: StyledComponent<"form", any> = styled.form`
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 60%;
    align-items: center;
    gap: 10px;
`;
const DropArea: StyledComponent<"div", any> = styled.div`
    width: 80%;
    height: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 1px grey dotted;
    flex-direction: column;
    margin-top: 16px;
`;
const FileInput: StyledComponent<"input", any> = styled.input`
    height: 2em;
    margin-bottom: 10px;
    margin-left: 16px;
`;
const HorizontalLine: StyledComponent<"hr", any> = styled.hr`
   width: 10%;
   height: 0.05em;
   background-color: grey;
`;
const H2: StyledComponent<"h2", any> = styled.h2`
   font-size: 1rem;
   margin-top: 10px;
   color: #00A0F1;
`;
const Count: StyledComponent<"h3", any> = styled.h3`
  color: #00A0F1;
`;
const Button: StyledComponent<"button", any> = styled.button`
   height: 50px;
   width: 150px;
   border-radius: 2em;
   color: white;
   background-color: #1B73E8;
   font-weight: 600;
   font-size: 1rem;
   margin-top: 16px;
   margin-bottom: 16px;
   cursor: pointer;

   &:hover {
    transform: scale(105%);
    transition: 0.1s ease;
    font-size: 1rem;
   }
`;
