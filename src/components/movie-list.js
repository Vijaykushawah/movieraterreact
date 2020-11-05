import React,{useState,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import {API} from '../api-service';
import { useCookies } from 'react-cookie';
import Mypopup from './custompopup';

function MovieList(props){

const [token, setToken] = useCookies(['mr-token']);
const [ showpopup,setShowpopup] = useState(false);
const [ popupdata,setPopupdata] = useState('');

const messagesEndRef = useRef(null);



const movieClicked = movie => evt => {
  setShowpopup(false);
  props.movieClicked(movie);
}

const editClicked = movie => evt => {
  props.editClicked(movie);
}

const removeClicked = movie => evt => {
  API.removeMovie(movie.id,token['mr-token'])
  .then( () => {
      setShowpopup(true);
      setPopupdata('');
      setPopupdata('Movie  deleted successfully...');
      props.removeClicked(movie);

    })
  .catch( error => console.log(error))

}

return (
  <div>

<Mypopup className="openClicked" openClicked={showpopup} setPopupdata={popupdata} />
  {
  props.movies &&  props.movies.map(movie => {
      return (
        <div key={movie.id} className="movie-item ">
        <h2 className="curser movietitle" onClick={movieClicked(movie)}>{movie.title}</h2>
        <FontAwesomeIcon className="curser" icon={faEdit} onClick = { editClicked(movie)} />
        <FontAwesomeIcon className="curser" icon={faTrash} onClick = { removeClicked(movie)}  />
      </div>)
    })
  }


  </div>
)

}
export default MovieList;
