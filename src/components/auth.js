import React,{useState,useEffect} from 'react';
import {API} from '../api-service';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt,faUserPlus,faSpinner,faCog,faSmile,faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Mypopup from './custompopup';
import Footer from './footer';


function Auth(){

const [ username,setUsername] = useState('');
const [ password,setPassword] = useState('');
const [ isLoginView,setIsLoginView] = useState(true);

const [ showpopup,setShowpopup] = useState(false);
const [ popupdata,setPopupdata] = useState('');


const [token, setToken] = useCookies(['mr-token']);

useEffect( () => {
  console.log(token);

  if(token['mr-token']) window.location.href='/movies';
},[token])

const loginClicked = () => {
  API.loginUser({username,password})
  .then( resp  => {
    if(typeof(resp.token) !== 'undefined'){
      setToken('mr-token',resp.token)
        .catch( error => console.log(error));
    }else{
      setShowpopup(true);
      setPopupdata(resp.non_field_errors);
    }

})}

const registerClicked = () => {
  API.registerUser({username,password})
  .then( resp => {
    if(resp.id ){
      setShowpopup(true);
      setPopupdata(resp.username+', You are registered successfully.Please login!!');
      setTimeout(() => {
window.location.href='/movies';
    }, 3000);


    }else{
      setShowpopup(true);
      setPopupdata(resp.username);

    }
    })
  .catch( error => alert('error data'+error))
}

const isDisabled = username.length === 0 || password.length ===0;

return (
  <div className="App">
  <header className="App-header">

  <Mypopup className="openClicked" openClicked={showpopup} setPopupdata={popupdata} />

    { isLoginView ? <h1>Login <FontAwesomeIcon icon={faSignInAlt} spin  border /></h1> : <h1>Register
<FontAwesomeIcon icon={faUserPlus}   />
    </h1>}

  </header>
<div className="login-container">

  <label htmlFor = "username">Username</label><br/>
  <input id = "username" type="text" placeholder="username" value={username} onChange={evt => setUsername(evt.target.value)}></input><br/>

  <label htmlFor = "password">Password </label><br/>
  <input id="password" type="password" placeholder="password" value={password} onChange={evt => setPassword(evt.target.value)}></input><br/>

{ isLoginView ?
<button onClick={ loginClicked} disabled={isDisabled}>Login</button>:
<button onClick={ registerClicked} disabled={isDisabled}>Register</button>
}

{isLoginView ?
<p className="curser" onClick= {() => setIsLoginView(false) }>You don't have an account? Register here!<FontAwesomeIcon icon={faSmile}   /><FontAwesomeIcon icon={faExternalLinkAlt}   />

 </p>:
<p className="curser" onClick= {() => setIsLoginView(true) }>You already have an account? Login here!<FontAwesomeIcon icon={faSmile}   /><FontAwesomeIcon icon={faCog} pulse  />

 </p>

}
      </div>
<Footer/>
</div>
)

}
export default Auth;
