import React ,{useState,useEffect,useRef} from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import  MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {useFetch} from './hooks/useFetch';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Mypopup from './components/custompopup';
import TinderSwipe from './components/tinderswipe';
import Footer from './components/footer';

function App() {

const [token,setToken,deleteToken] = useCookies(['mr-token']);
const [movies,setMovies] = useState(['Movie1','Movie2']);
const [selectedMovie,setSelectedMovie] = useState(null);
const [editedMovie,setEditedMovie] = useState(null);
const [data,loading,error] = useFetch();
const [ showpopup,setShowpopup] = useState(false);
const messagesEndRef = useRef(null);

useEffect( () => {
  console.log(data);
  setMovies(data);
},[data])


useEffect(()=>{
  fetch("http://127.0.0.1:8000/api/movies/",{
  method:'GET',
  headers:{
    'Content-Type':'application/json',
    'Authorization':`Token ${token['mr-token']}`
  }
}).then( resp => resp.json())
.then( resp => setMovies(resp))
.catch( error => console.log(error))
},[])

useEffect( () => {
  if(!token['mr-token']) window.location.href='/';
},[token])

// const movieClicked = movie =>{
//   setSelectedMovie(movie);
//   setEditedMovie(null);
//
// }

const loadMovie = movie => {
  setSelectedMovie(movie);
  setEditedMovie(null);
  setShowpopup(false);
  messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
}

const editClicked = movie => {
  messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  setEditedMovie(movie);
  setSelectedMovie(null);
}

const updatedMovie = movie => {
  const newMovies = movies.map( mov => {
    if (mov.id === movie.id){
      return movie;
    }
    return mov;
  } )
  setMovies(newMovies)
}

const newMovie = ( ) =>{
  setEditedMovie({title:'',description:''});
  setSelectedMovie(null);
}

const movieCreated = movie =>{
  const newMovies = [...movies,movie];
  setMovies(newMovies);
}

const removeClicked = movie => {
  const newMovies = movies.filter( mov => {
    if (mov.id === movie.id) {
      return false;
    }
    return true;
  })
  setMovies(newMovies);
}

const logoutUser = () => {
  deleteToken(['mr-token']);
}

if(loading) return <h1>Loading...</h1>
if(error) return <h1>Error loading movies:{error}</h1>

  return (
    <div className="App" ref={messagesEndRef}>
      <header className="App-header">

        <h1>
        <FontAwesomeIcon icon={faFilm}  />
          <span>Movie Rater</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt}  onClick={logoutUser} />

      </header>
      <div className="layout">
      <div>
      <Mypopup openClicked={showpopup} />
      <button onClick = {newMovie}>Add Movie </button>
      <TinderSwipe movieClicked={loadMovie} />

      <h1>Movies List by Title</h1>
      <MovieList
      movies={movies}
      movieClicked={loadMovie}
      editClicked={editClicked}
      removeClicked={removeClicked} />

      </div>
      <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
      {editedMovie ? <MovieForm movie ={editedMovie} updatedMovie={updatedMovie}
      movieCreated ={movieCreated}

       /> : null }




      </div>
      <Footer/>
    </div>
  );
}

export default App;
