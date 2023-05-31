import { useEffect, useState } from "react";
import Header from "../../Header/Header";
import "../Movies/Movies.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";

const Movies = () =>{
    const navigate = useNavigate();
    const [movieDetail, setMovieDetail] = useState([]);
    const [changeColor, setChangeColor] = useState(true);

    const handleChangeColor = () =>{
        setChangeColor(!changeColor);
    }

    const getMovies = async() =>{
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1c1623d3897235058b0865921ec55743&query=pokemon`);
        const response = await data.json();
        setMovieDetail(response.results);
        console.log(response.results); 
    }

    useEffect(()=>{
        getMovies();
    },[])

    const handleMovieDetails = (movieId ) =>{
        navigate(`/moviedetails/${movieId }`);
    }

    return(
        <>
            <div className="movies-header">
                <Header includeScrollFunctionality={false} changeColor={changeColor} handleChangeColor={handleChangeColor} />
            </div>
            <div className="container movie-data">
                <div className="row">
                    {
                        movieDetail.map((movie)=>(
                            <div key={movie.id} className="col-sm-3 movies-item">
                                <div onClick={()=>handleMovieDetails(movie.id)} className={`movies-list ${changeColor ? "aboutus-dark-theme":"light-theme"}`}>
                                    <img className="movie-image" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                    <p className="movie-date">{movie.release_date}</p>
                                    <p className="movie-name">{movie.title}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Movies;