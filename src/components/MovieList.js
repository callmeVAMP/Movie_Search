import React from 'react';

const MovieList = (props)=>{
    const FavouriteComponent = props.favouriteComponents;


    return(
        <>
            {props.movies.map((movie,index)=>(
                <div className='image-container d-flex justify-content-start m-3 '>
                    <img src={movie.Poster} alt='moviee' />
                    <div 
                    className='overlay d-flex align-items-center justify-content-center' 
                    onClick={()=> props.handleFavouritesClick(movie)}>
                        
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
};
export default MovieList;