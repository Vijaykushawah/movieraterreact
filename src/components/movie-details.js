import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import Mypopup from './custompopup';


function MovieDetails(props){

let mov = props.movie;

const [highlighted,setHighlighted] = useState(-1);

const [token] = useCookies(['mr-token']);
const [ showpopup,setShowpopup] = useState(false);
const [ popupdata,setPopupdata] = useState('');
//const [ movie ,setMovie] = useState(props.movie);

const highlightRate = high => evt => {
  setHighlighted(high);
}

const rateClicked = rate => evt => {
  fetch(`https://movierater.pythonanywhere.com/api/movies/${mov.id}/rate_movie/`,{
  method:'POST',
  headers:{
    'Content-Type':'application/json',
    'Authorization':`Token ${token['mr-token']}`
  },
  body: JSON.stringify( {stars:rate+1} )
  })
  .then( () => {
    setShowpopup(true);
    setPopupdata('');
    setPopupdata('Congratulations!! You have rated movie successfully...');
    getDetails();})
  .catch( error => console.log(error))

}

const getDetails = () => {

  fetch(`https://movierater.pythonanywhere.com/api/movies/${mov.id}/`,{
  method:'GET',
  headers:{
    'Content-Type':'application/json',
    'Authorization':`Token ${token['mr-token']}`
  }
  })
  .then( resp => resp.json())
  .then( resp => props.updateMovie(resp) )
  .catch( error => console.log(error))

}

return (
  <React.Fragment>

{ mov ? (
  <div>
  <Mypopup className="openClicked" openClicked={showpopup} setPopupdata={popupdata} />
  <h1>Movie Detail</h1>
  <p><img src={mov.cover} className="clickedImage" width="60%" height="100%" /></p>
  <h1>Title:</h1>{  mov.title}
  <h1>Description:</h1>{  mov.description}

  <h1 className="rating">Rating:</h1>
  <FontAwesomeIcon icon={faStar} className={mov.avg_rating>0 ? 'orange' : ''} />
  <FontAwesomeIcon icon={faStar} className={mov.avg_rating>1 ? 'orange' : ''} />
  <FontAwesomeIcon icon={faStar} className={mov.avg_rating>2 ? 'orange' : ''} />
  <FontAwesomeIcon icon={faStar} className={mov.avg_rating>3 ? 'orange' : ''} />
  <FontAwesomeIcon icon={faStar} className={mov.avg_rating>4 ? 'orange' : ''} />
  ({mov.no_of_ratings})

  <div className="rate-container">
  <h1>Rate it</h1>
  {[...Array(5)].map( (e,i) =>{
    return <FontAwesomeIcon key={i} icon={faStar} className={highlighted>i-1 ? 'purple' : ''}
    onMouseEnter = {highlightRate(i)}
      onMouseLeave = {highlightRate(-1)}
      onClick = {rateClicked(i)}

     />
  } )

  }
<br/><br/>
<br/><br/>
<br/><br/>
  </div>
  </div>

) :null }


  </React.Fragment>
)

}
export default MovieDetails;
