import {useEffect,useState} from 'react';
import { useCookies } from 'react-cookie';
import {API} from '../api-service';

function useFetch(){
  const [token] = useCookies(['mr-token']);
 const [data,setData] = useState([]);
 const [loading,setLoading] = useState(true);
 const [error,setError] = useState([]);

 useEffect( () => {
   async function fetchData(){
     setLoading(true);
     setError();
     const data = await API.getMovies(token['mr-token'])
                           .catch(error => setError(error))
     setData(data)
     setLoading(false);

   }
   fetchData();
 } ,[]);
 return [data, loading, error]

}

export {useFetch}
