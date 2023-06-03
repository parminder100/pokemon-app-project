import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import PokemonMoviesDetailsSkeletonLoader from "../../Loader/PokemonMoviesDetailsSkeletonLoader";
import "../Movies/MoviesDetails.css";

const MoviesDetails = () =>{
    const {movieId}   = useParams();
    const [movieData, setMovieData] = useState([]);
    const [trailerKey, setTrailerKey] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [changeColor, setChangeColor] = useState(true);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setShowLoader(false);
        },3000)
    },[])

    const handleChangeColor = () =>{
        setChangeColor(!changeColor);
    }

    useEffect(()=>{
        const getMoviesDetails = async () =>{
            const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=1c1623d3897235058b0865921ec55743`);
            const response = await data.json();
            setMovieData(response)
            console.log(response);

            const trailerData = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=1c1623d3897235058b0865921ec55743`);
            const trailerResponse = await trailerData.json();
            const trailers = trailerResponse.results;

            const trailer = trailers.find((trailer)=> trailer.type === "Trailer" && trailer.site === "YouTube");

            if(trailer){
                setTrailerKey(trailer.key);
            }
        }
        getMoviesDetails();
    },[movieId])

    const openPopup = () =>{
        setIsPopupOpen(true);
    }

    const closePopup = () =>{
        setIsPopupOpen(false);
    }
    return(
        <>
            <div className="movidetails-header">
                <Header includeScrollFunctionality={false} handleChangeColor={handleChangeColor} />
            </div>
            {
                showLoader ? (
                    <PokemonMoviesDetailsSkeletonLoader />
                ):(
            <div style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieData.backdrop_path}`, backgroundRepeat: "no-repeat", backgroundSize:"cover", backgroundPosition:"left calc((50vw - 170px) - 339px) top"}}>
                <div className="custome-bg">
                    <div className="container movidetails_content">
                        <div className="row align-items-center">
                            <div className="col-sm-4">
                                <img className="selected-movie-image" src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.title} />
                            </div>
                            <div className="col-sm-8 selected-movie-detail text-white">
                                {movieData.genres &&
                                    <span className="moviedetails-genres">{movieData.genres.map((genre)=> genre.name).join(", ")}</span>
                                }
                                <p className="moviedetails-name">{movieData.title}</p>
                                <ul className="moviedetails-language">
                                    {movieData.spoken_languages &&
                                        <>
                                            <li className="language-name"><i class="fa fa-language"></i>{movieData.spoken_languages[0].english_name}</li>
                                            <li><i class="fa fa-clock-o"></i>{movieData.runtime} mins</li>
                                        </>
                                    }
                                </ul>
                                <p>{movieData.overview}</p>
                                <button className="trailer-btn" onClick={openPopup}><i class="fa fa-play-circle"></i>Watch Trailer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
            <div className="moviedetails-footer">
                <Footer />
            </div>
            {isPopupOpen && (
                <div className="popup-container">
                <div className="popup-content">
                    <div className="close-button" onClick={closePopup}>
                        <i class="fa fa-times-circle"></i>
                    </div>
                    <div className="video-container">
                    <iframe
                        className="centered-video"
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                    </div>
                </div>
                </div>
            )}
        </>
    )
}
export default MoviesDetails;