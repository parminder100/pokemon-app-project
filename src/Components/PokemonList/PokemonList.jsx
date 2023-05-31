import { useEffect, useState } from "react";
import "../PokemonList/PokemonList.css";
import pokemontypegrass from "../../Assets/img/pokemontypegrass.png";
import pokemontypefire from "../../Assets/img/pokemontypefire.png";
import pokemontypewater from "../../Assets/img/pokemontypewater.png";
import pokemontypebug from "../../Assets/img/pokemontypebug.png";
import pokemontypenormal from "../../Assets/img/pokemontypenormal.png";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import PokemonListSkeletonLoader from "../Loader/PokemonListSkeletonLoader";
import Slider from "../Slider/Slider";
import Footer from "../Footer/Footer";

const PokemonList = () =>{
    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [pokemonType, setPokemonType] = useState([]);
    const [pokemonInput, setPokemonInput] = useState("");
    const [showLoader, setShowLoader] = useState(true);
    const navigate = useNavigate();
    const [changeColor, setChangeColor] = useState(true);

    const handleChangeColor = () =>{
        setChangeColor(!changeColor);
    }

    const getPokemonData = async() =>{
        const data = await fetch(" https://pokeapi.co/api/v2/pokemon/");
        const response = await data.json();
        setPokemonDetails(response.results);
        console.log(response.results);
    }

    const getPokemonImage = (pokemonId) =>{
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
    }

    const getPokemonType = async (url) =>{
        const data = await fetch(url);
        const response = await data.json();
        return response.name;
    }

    const getTypeImage = (typeName) =>{
        switch(typeName){
            case "grass":
                return{ 
                    image:pokemontypegrass,
                    className: "pokemontypegrass",
                }
            case "fire":
                return{ 
                    image:pokemontypefire,
                    className: "pokemontypefire",
                }
            case "water":
                return{
                    image: pokemontypewater,
                    className: "pokemontypewater",
                }
            case "bug":
                return{
                    image: pokemontypebug,
                    className: "pokemontypebug",
                }
            case "normal":
                return{
                    image: pokemontypenormal,
                    className: "pokemontypenormal",
                }
            default:
                return "";
        }
    }

    const getPokemonCardBackgroundColor = (typeName) =>{
        switch(typeName){
            case "grass":
                return{
                    className: "pokemontypegrassbg"
                }
            case "fire":
                return{
                    className: "pokemontypefirebg"
                }
            case "water":
                return{
                    className: "pokemontypewaterbg"
                }
            case "bug":
                return{
                    className: "pokemontypebugbg"
                }
            case "normal":
                return{
                    className : "pokemontypenormalbg"
                }
            default:
            return "";
        }
    }

    useEffect(()=>{
        getPokemonData();
    },[]);

    useEffect(()=>{
        const fetchPokemonTypes = async () =>{
            const types = await Promise.all(
                pokemonDetails.map(async (pokemon) =>{
                    const data  = await fetch(pokemon.url);
                    const response = await data.json();
                    const typeName = await getPokemonType(response.types[0].type.url);
                    return typeName;
                })
            )
            setPokemonType(types);
            console.log(types);
        }
        if(pokemonDetails.length > 0){
            fetchPokemonTypes()
        }
    },[pokemonDetails])

    const handlePokemonInput = (e) =>{
        setPokemonInput(e.target.value);
    }
    const uniquePokemon = pokemonDetails.filter((pokemon)=>pokemon.name.toLowerCase().includes(pokemonInput.toLowerCase()));

    const filteredPokemonTypes = uniquePokemon.map(
        (pokemon) => pokemonType[pokemonDetails.findIndex((p) => p.name === pokemon.name)]
    );

    const handlePokemon = (pokemonName) =>{
        navigate(`/pokemonDetails/${pokemonName}`);
    }

    useEffect(()=>{
        setTimeout(()=>{
            setShowLoader(false)
        }, 3000);
    },[])
      
    return(
        <> 
            <div className="pokemonlist-header">
                <Header pokemonInput={pokemonInput} handlePokemonInput={handlePokemonInput}  changeColor={changeColor} handleChangeColor={handleChangeColor} />
            </div>
            <Slider />
            <div className="container">
                <div className="row">
                {showLoader?(
                    Array.from({ length: 20 }).map((index) => (
                        <div key={index} className="col-sm-3 skeleton-loader">
                          <PokemonListSkeletonLoader />
                        </div>
                    ))
                    ):(
                    uniquePokemon.map((pokemon, index)=>{
                        const pokemonId = pokemon.url.split("/")[6];
                        const typeName = filteredPokemonTypes[index];
                        return(
                        <>
                                <div className="col-sm-3">
                                    { typeName &&(
                                        <div onClick={()=>handlePokemon(pokemon.name)} className={`pokemon-card ${getPokemonCardBackgroundColor(typeName).className}`}>
                                            <img className="pokemon-image" src={getPokemonImage(pokemonId)} alt={pokemon.name} />
                                            <p className="pokemon-name">{pokemon.name}</p>
                                            {typeName && 
                                            <div>
                                                <p className="pokemon-type">{typeName}</p>
                                                <div className={`pokemon-type-bg ${getTypeImage(typeName).className} `}>
                                                    <img src={getTypeImage(typeName).image} alt={typeName} />
                                                </div>
                                            </div>
                                            }
                                        </div>
                                    )}
                                </div>
                        </>
                        )
                    }))
                }
                </div>
            </div>
            <Footer />
        </>
    )
}
export default PokemonList;