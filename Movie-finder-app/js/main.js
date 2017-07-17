 /*exported movieSelected */


/* global $ */
$(document).ready(function(){
    $('#searchForm').on('submit', (e) => {
       let searchText = $('#searchText').val();
        e.preventDefault();
        getMovies(searchText);
        
    });
});

    function getMovies(searchText){
 /* global axios */       
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=c99dc355274ddba4ca8c06c5a51738eb&query='+searchText).then((response) => {
        let movies = response.data.results;
        let output = '';
        $.each(movies, (index, movie) =>{
            output+=`
            <div class="col-md-3">
            <div class="well text-center">
            <img class="pic" src="https://image.tmdb.org/t/p/w342${movie.poster_path}">
            <h5>${movie.title}</h5> 
            <a onclick= "movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details </a>
            
            </div>
            </div>
            
            `;
            
        });
        
        $('#movies').html(output);
          
      })
      
     .catch((err) =>{
         console.log(err);
     });
      
    }
     
    
    function movieSelected(id){
        sessionStorage.setItem('movieId', id);
        window.location = 'movie.html';
        return false;
        
        
    }
    
    function getMovie(){
        let movieId = sessionStorage.setItem('movieId');
        
        axios.get('https://api.themoviedb.org/3/movie/movieId?api_key=c99dc355274ddba4ca8c06c5a51738eb').then((response) => {
        let movie = response.data;
        
        
        let output = `
        <div class="row">
            <div class="col-md-4">
            </div>
                <img src="${movie.poster_path}" class="thumbnail">
        <div class="col-md-8">
        <h2>${movie.title}</h2>
        <ul class="list-group">
        <li class="list-group-item"><strong>Genre;</strong>${movie.Genre}</li>
        <li class="list-group-item"><strong>Released:</strong>${movie.released}</li>
        <li class="list-group-item"><strong>Popularity</strong>${movie.popularity}</li>
        <li class="list-group-item"><strong>Director</strong>${movie.director}</li>
        <li class="list-group-item"><strong>Writer:</strong>${movie.writer}</li>
        
        
        
        
        
        </ul>
            </div>
        </div>
        <div class="row">
        <div class="well">
        <h3>Plot</h3>
        ${movie.overview}
        <hr>
        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class =" btn btn-primary">View Imdb </a>
        <a href="index.html" class="btn btn-primary">Go back to search</a>
        </div>
        </div>
        
        
        
        `;
        
        $('#movie').html(output);
      })
      
     .catch((err) =>{
         console.log(err);
     });
        
        
        
        
        
        
    }
    
   
  