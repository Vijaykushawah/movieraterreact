import React,{useState,useEffect} from 'react';
import {API} from '../api-service';
import { useCookies } from 'react-cookie';
import Mypopup from './custompopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner,faCog,faSmile } from '@fortawesome/free-solid-svg-icons';

function MovieForm(props){

const [title,setTitle] = useState('');
const [description,setDescription] = useState('');
const [cover,setCover] = useState();

const [token] = useCookies(['mr-token']);

const [ showpopup,setShowpopup] = useState(false);
const [ popupdata,setPopupdata] = useState('');
const [processing,setProcessing] = useState(false);



useEffect( () =>{
  setTitle(props.movie.title);
  setDescription(props.movie.description);
},[props.movie] )

const updateClicked = () =>{
  setProcessing(true);
  API.updateMovie(props.movie.id,{title,description},token['mr-token'])
  .then( resp => {
    setProcessing(false);
    if(resp.id){
      setShowpopup(true);
      setPopupdata('');
      setPopupdata('Movie  updated successfully...');
      props.updatedMovie(resp);
    }else{
      setShowpopup(true);
      setPopupdata(resp.title);
    }

  } )
  .catch( error => console.log(error) )
}

const createClicked = () =>{
  setProcessing(true);
const uploadData = new FormData();
uploadData.append('title',title);
uploadData.append('description',description);
uploadData.append('cover',cover,cover.name);
  API.createMovie(uploadData,token['mr-token'])
  .then( resp => {
    setProcessing(false);
    if(resp.id){
      setShowpopup(true);
      setPopupdata('');
      setPopupdata('Congratulations!! Movie  created successfully...');
      props.movieCreated(resp);
    }else{
      setShowpopup(true);
      setPopupdata(resp.title);
    }

     })
  .catch( error => console.log(error) )
}

const isDisabled = title.length === 0 || description.length ===0 || typeof(cover) === 'undefined' ;
const isDisabled2 = title.length === 0 || description.length ===0  ;

if(processing) return <h1 className="modal"> Loading...<br/><FontAwesomeIcon icon={faSmile}   /><FontAwesomeIcon icon={faSpinner} pulse  /></h1>

  return (
    <React.Fragment>
  { props.movie ? (
<div>
<Mypopup className="openClicked" openClicked={showpopup} setPopupdata={popupdata} />
<label htmlFor = "title">Title</label><br/>
<input id = "title" type="text" placeholder="title" value={title} onChange={evt => setTitle(evt.target.value)}></input><br/>

<label htmlFor = "description">Description </label><br/>
<textarea id="description" type="text" placeholder="Description" value={description} onChange={evt => setDescription(evt.target.value)}></textarea><br/>
{props.movie.id ?
<button onClick={ updateClicked} disabled={isDisabled2}>Update</button> :<div>
<label htmlFor = "cover">Cover Image</label><br/>
<input id = "cover" type="file" placeholder="file"  onChange={evt => setCover(evt.target.files[0])}></input><br/>
<button onClick={ createClicked} disabled={isDisabled}>Create</button></div>
}

    </div>
  ):null
}
</React.Fragment>
  )
}

export default MovieForm;
