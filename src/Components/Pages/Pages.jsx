import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonInfo from "../PokemonInfo/PokemonInfo";
import PokemonList from "../PokemonList/PokemonList";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import Movies from "./Movies/Movies";
import MoviesDetails from "./Movies/MoviesDetails";
import News from "./News/News";

const Pages = () =>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PokemonList />}></Route>
                    <Route path="/pokemonDetails/:name" element={<PokemonInfo />}></Route>
                    <Route path="/aboutus" element={<AboutUs />}></Route>
                    <Route path="/news" element={<News />}></Route>
                    <Route path="/movies" element={<Movies />}></Route>
                    <Route path="/contactus" element={<ContactUs />}></Route>
                    <Route path="/moviedetails/:movieId" element={<MoviesDetails />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Pages;