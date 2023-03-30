import { BaseSyntheticEvent, ReactElement, useEffect, useRef, useState } from "react";
import { storage } from "../../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import styled, { StyledComponent } from "styled-components";
import { create } from "../../redux/async_thunks/albumThunk";
import { ArtistState, RootState } from "../../redux/store/store";
import { AlbumPayload } from "../../types";
import { ref, uploadBytes, UploadResult, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/slices/albumSlice";


export interface AlbumFormProps {
}

export default function AlbumForm(props: AlbumFormProps): ReactElement {

    const dropAreaRef = useRef<HTMLDivElement>(null);

    const previewRef = useRef<HTMLImageElement>(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const album = useSelector((state: RootState) => {
        return state.album;
    });

    const artist = useSelector((state: RootState): ArtistState => {
        return state.artist;
    });

    const { isLoading, isError, isSuccess, message } = album;

    const [formData, setFormData] = useState<AlbumPayload>({
        title: "",
        file: null,
        genre: "",
        year: "",
        artist_id: artist.artist._id,
        fileName: "",
        url: ""
    });

    const { title, file, year, genre, fileName, artist_id } = formData;

    useEffect(() => {

        console.log(formData)

    }, [title, file, formData, year, genre, artist_id]);

    useEffect(() => {

        if (isSuccess) {
            navigate("/");
        }

        return (): void => {
            dispatch<any>(reset(album));
        }

    }, [isSuccess, message]);

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

    function handleDrop(e: DragEventInit): void {
        const data = e.dataTransfer;

        if (data) {
            const files = data.files;
            handleFiles(files);
        }
    }

    function handleOnChange(e: BaseSyntheticEvent): void {

        const name = e.target.name;

        setFormData((prevState: AlbumPayload): AlbumPayload => {
            const obj = {
                ...prevState,
                [name]: e.target.value
            }

            return obj;
        });
    }

    function handleFiles(files: FileList): void {

        for (let i = 0; i < files.length; i++) {

            // create a new object of the FileReader API
            const reader = new FileReader();

            const file = files[i];

            // read input as blob file
            reader.readAsDataURL(file);

            // after file has loaded to DOM
            reader.onload = (): void => {

                const preview = previewRef.current;
                const dropArea = dropAreaRef.current;

                if (preview && dropArea) {

                    // hide drop area and show preview of image
                    preview.classList.add("show");
                    preview.classList.remove("hide");
                    dropArea.style.display = "none";

                    // set result of reader to images's src attribute
                    preview.src = `${reader.result}`;
                    preview.alt = `${file.name}`

                    // copy over prev state and append file to album state
                    setFormData((prevState: AlbumPayload): AlbumPayload => {
                        const obj = {
                            ...prevState,
                            file,
                            fileName: file.name
                        };

                        return obj;
                    });
                }
            }
        }
    }

    function handleOnSubmit(e: BaseSyntheticEvent): void {
        e.preventDefault();

        const reference = ref(storage, "album_covers/" + fileName);
        const metadata = { contentType: "image", customMetadata: { name: fileName } };

        uploadBytes(reference, file as File, metadata).then(async (snapshot: UploadResult): Promise<any> => {
            const url = await getDownloadURL(snapshot.ref);

            setFormData((prevPayload: AlbumPayload): AlbumPayload => {
                const object = {
                    ...prevPayload,
                    url
                }

                return object;
            })

            const albumPayload = {
                title,
                genre,
                artwork: url,
                year,
                artist_id
            }
            
            console.log(albumPayload);

            dispatch<any>(create(albumPayload));
        });
    }

    function handleCancel(): void {

        setFormData((): any => {
            return {
                title: "",
                genre: "",
                year: "",
                artwork: null,
              }
        });

        if (!dropAreaRef.current) return;

        previewRef.current?.classList.add("hide");
        previewRef.current?.classList.remove("show");
        dropAreaRef.current.style.display = "";
    }

    if (!artist.artist)
    return <></>

    return (
        <Div>
            <Container>

                <H1>Create an Album</H1>

                <Form method="POST"
                    onSubmit={(e: BaseSyntheticEvent): void => {
                        handleOnSubmit(e);
                    }}
                    onChange={(e: BaseSyntheticEvent): void => {
                        handleOnChange(e);
                    }}>
                    <Title name="title" type="text" onChange={handleOnChange} value={title && title} placeholder="Title"></Title>
                    <Title name="genre" type="text" onChange={handleOnChange} value={genre && genre} placeholder="Genre"></Title>
                    <Title name="year" type="number" onChange={handleOnChange} value={year && year} placeholder="Year"></Title>

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
                        <FileInput type="file" name="artwork" ></FileInput>
                        <HorizontalLine></HorizontalLine>
                        <H2>Drag and Drop Artwork</H2>
                    </DropArea>

                    <Preview className="hide" ref={previewRef}></Preview>

                    <Button type="submit">Submit</Button>
                    
                    { fileName &&
                    <CancelButton onClick={() => {
                        handleCancel();
                    }}>cancel</CancelButton>
                }
                </Form>

            </Container>
        </Div>
    );
}
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
const Title: StyledComponent<"input", any> = styled.input`
     width: 90%;
     height: 3em;
     margin-top: 16px;
     border-radius: 1.5em;
     background-color: #bdbec0;
     color: black;
     font-size: 1.05rem;
     text-indent: 16px;

     &:focus {
        outline: none;
        border: none;
     }
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
const Preview: StyledComponent<"img", any> = styled.img`
  background-color: black;
  width: 100px;
  height: 100px;
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

const CancelButton: StyledComponent<"button", any> = styled.button`
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