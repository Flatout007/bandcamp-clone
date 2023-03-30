import { BaseSyntheticEvent, ReactElement, useEffect, useRef, useState } from "react";
import { storage } from "../../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import styled, { StyledComponent } from "styled-components";
import { ArtistState, RootState } from "../../redux/store/store";
import { ArtistPayload } from "../../types";
import { ref, uploadBytes, UploadResult, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { reset } from "../../redux/slices/albumSlice";
import { edit } from "../../redux/async_thunks/artistThunk";


export interface PhotoFormProps {
}

export default function PhotoForm(props: PhotoFormProps): ReactElement {

    const dropAreaRef = useRef<HTMLDivElement>(null);

    const previewRef = useRef<HTMLImageElement>(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { id } = useParams();

    const { isLoading, isError, isSuccess, message } = useSelector((state: RootState): ArtistState => {
        return state.artist
    });

    const artist = useSelector((state: RootState): ArtistState => {
        return state.artist;
    });

    const [formData, setFormData] = useState<ArtistPayload>({
        file: null,
        fileName: "",
        url: ""
    });

    const { file, url, fileName } = formData;

    useEffect(() => {

        if (isSuccess)
            resetAndRedirect();

    }, [file, formData, url, isSuccess])

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

        setFormData((prevState: ArtistPayload): ArtistPayload => {
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

                    console.log(file);

                    // copy over prev state and append file to album state
                    setFormData((prevState: ArtistPayload): ArtistPayload => {
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

        const reference = ref(storage, "artist_images/" + artist?.artist?.name);
        const metadata = { contentType: "image", customMetadata: { name: fileName as string } };

        uploadBytes(reference, file as File, metadata).then(async (snapshot: UploadResult): Promise<any> => {

            const url = await getDownloadURL(snapshot.ref);

            setFormData((prevPayload: ArtistPayload): ArtistPayload => {
                const object = {
                    ...prevPayload,
                    url
                }

                return object;
            })

            const artist = url ? { photo: url } : {}

            dispatch<any>(edit({ _id: id, artist }));
        });
    }

    function resetAndRedirect(): void {
        dispatch<any>(reset(artist));
        navigate("/");
    }

    return (
        <Div>
            <Container>

                <H1>Add a Photo</H1>

                <Form method="PUT"
                    onSubmit={(e: BaseSyntheticEvent): void => {
                        handleOnSubmit(e);
                    }}
                    onChange={(e: BaseSyntheticEvent): void => {
                        handleOnChange(e);
                    }}
                >
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
                        <H2>Drag and Drop new Artwork</H2>
                    </DropArea>

                    <Preview className="hide" ref={previewRef}></Preview>

                    <Button type="submit">Submit</Button>
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
