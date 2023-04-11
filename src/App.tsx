import './App.css';
import Index from './containers/Index';
import AlbumShow from './containers/AlbumShow';
import AudioForm from './components/forms/AudioForm';
import ArtistShow from './containers/ArtistShow';
import AlbumForm from './components/forms/AlbumForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import AlbumFormEdit from './components/forms/AlbumFormEdit';
import ArtistFormEdit from './components/forms/ArtistFormEdit';
import PhotoForm from './components/forms/PhotoForm';

function App() {

  return (
    <>
      <Router>
        <div className="App">
          <Toaster />

          <Routes>
            <Route path='/' element={<Index />} />

            <Route path='/artist_albums_page/:id' element={<ArtistShow />} />

            <Route path='/albums_songs_page/:id/:artist_id' element={<AlbumShow />} />

            <Route path="/albums/new" element={<AlbumForm />} />

            <Route path="artist_albums_page/:id/:album_id/tracks/new" element={<AudioForm />} />

            <Route path="artist_albums_page/:id/edit" element={<AlbumFormEdit />} />

            <Route path="artist/edit/:id" element={<ArtistFormEdit />} />

            <Route path="/artist/edit/photo/:id" element={<PhotoForm />}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
