import React ,{useState,useEffect} from 'react';
import TinderCard from 'react-tinder-card';
import {useFetch} from '../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


function TinderSwipe(props){

const [data,loading,error] = useFetch();


  const characters = data
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
      props.movieClicked(nameToDelete);
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    props.movieClicked(name);
  }

  return (
    <div>

      <h1>Swipe Movie to get Details</h1>
      <div className='cardContainer '>
        {characters.map((character) =>
          <TinderCard className='swipe' key={character.title} onSwipe={(dir) => swiped(dir, character)} onCardLeftScreen={() => outOfFrame(character)}>
            <div style={{ backgroundImage: 'url(' + character.cover + ')' }} className='card glow'>
              <h3 className='glow'>{character.title}<br/>
              <FontAwesomeIcon icon={faStar} className={character.avg_rating>0 ? 'orange' : ''} />
              <FontAwesomeIcon icon={faStar} className={character.avg_rating>1 ? 'orange' : ''} />
              <FontAwesomeIcon icon={faStar} className={character.avg_rating>2 ? 'orange' : ''} />
              <FontAwesomeIcon icon={faStar} className={character.avg_rating>3 ? 'orange' : ''} />
              <FontAwesomeIcon icon={faStar} className={character.avg_rating>4 ? 'orange' : ''} />
              </h3>
            </div>
          </TinderCard>
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  )


}
export default TinderSwipe;
