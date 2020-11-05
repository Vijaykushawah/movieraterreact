
export class API{
  static updateMovie(mov_id,body,token){

  return  fetch(`http://movierater.pythonanywhere.com/api/movies/${mov_id}/`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Token ${token}`
    },
    body: JSON.stringify( body )
    }).then( resp => resp.json())

  }

  static createMovie(body,token){

  return  fetch(`http://movierater.pythonanywhere.com/api/movies/`,{
    method:'POST',
    headers:{

      'Authorization':`Token ${token}`

    },
    body:  body
    }).then( resp => resp.json())

  }


  static removeMovie(mov_id,token){

  return  fetch(`http://movierater.pythonanywhere.com/api/movies/${mov_id}/`,{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Token ${token}`
    }

    })

  }

  static loginUser(body){

  return  fetch(`http://movierater.pythonanywhere.com/auth/`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify( body )
    }).then( resp => resp.json())

  }

  static registerUser(body){

  return  fetch(`http://movierater.pythonanywhere.com/api/users/`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify( body )
    })
    .then( resp => resp.json())

  }


  static getMovies(token){

  return  fetch(`http://movierater.pythonanywhere.com/api/movies/`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Token ${token}`
    }
    }).then( resp => resp.json())

  }





}
