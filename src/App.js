import React,{ useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import MovieList from './components/MovieList';

import MovieListHeading from './components/MovieListHeading';

import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite';
import RemoveFavourites from './components/RemoveFavourites';
const App=()=>{
  const [movies,setMovies]=useState([]);
  const [searchValue,setSearchValue]=useState('');
  const [favourites,setFavourites]=useState([]);

  const getMovieRequest = async(searchValue)=>{
    const url =`http://www.omdbapi.com/?s=${searchValue}&apikey=b86d6136`;

    const response = await fetch(url);
    const responseJson = await response.json();
    if(responseJson.Search){
      setMovies(responseJson.Search);
    };
  }

  useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue]);

  useEffect(()=>{
    const movieFavourites=JSON.parse(localStorage.getItem('react-movie-app-favourites'));
    setFavourites(movieFavourites);
  },[]);

  const saveToLocalStorage=(items)=>{
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie =(movie)=>{
    const newFavouriteList =[...favourites,movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const RemoveFavouriteMovie=(movie)=>{
    const newFavouriteList = favourites.filter((favourite)=>favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }
  return (
  <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Feel The Reel' />
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
    <div className='row'>
    <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie}  favouriteComponents={AddFavourite} />

    </div>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='My Favourites' />
    </div>
    <div className='row'>
    <MovieList movies={favourites} handleFavouritesClick={RemoveFavouriteMovie}  favouriteComponents={RemoveFavourites} />

    </div>
  </div>
  )
}

export default App;
