import { useState, useEffect } from "react";
import {useParams } from "react-router-dom";
import "../PokemonInfo/PokemonInfo.css";
import pokemontypegrass from "../../Assets/img/pokemontypegrass.png"
import pokemontypepoison from "../../Assets/img/pokemontypepoison.png"
import pokemontypefire from "../../Assets/img/pokemontypefire.png";
import pokemontypewater from "../../Assets/img/pokemontypewater.png";
import pokemontypebug from "../../Assets/img/pokemontypebug.png";
import pokemontypenormal from "../../Assets/img/pokemontypenormal.png";
import pokemontypeflying from "../../Assets/img/pokemontypeflying.png";
import PokemonInfoSkeletonLoader from "../Loader/PokemonInfoSkeletonLoader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const PokemonInfo = () =>{
    const {name} = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    const [evolutionImages, setEvolutionImages] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [changeColor, setChangeColor] = useState(true);

    const handleChangeColor = () =>{
        setChangeColor(!changeColor);
    }

    useEffect(() => {
        const pokemonDetails = async ()=>{
            try{
                const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                const response = await data.json()
                setPokemonData(response)
                console.log(response)
            }
            catch(error){
                console.log("Error fetching pokemon details", error)
            }
        }
        pokemonDetails()
      }, [name]);

        useEffect(()=>{
            setTimeout(()=>{
                setShowLoader(false)
            },3000)
        },[])

      useEffect(() => {
        const getSpeciesData = async () => {
            if (pokemonData) {
              try {
                const speciesData = await fetch(
                  `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`
                );
                const response = await speciesData.json();
          
                const flavorTextEntry = response.flavor_text_entries.find(
                  (entry) => entry.language.name === "en"
                );
          
                const aboutText = flavorTextEntry ? flavorTextEntry.flavor_text : "";
          
                setPokemonData((prevData) => ({ ...prevData, aboutText }));
              } catch (error) {
                console.log("Error fetching species data", error);
              }
            }
          };
      
        getSpeciesData();
      }, [pokemonData]);

      useEffect(() => {
        const fetchEvolutionChain = async () => {
          if (pokemonData) {
            try {
              const speciesResponse = await fetch(pokemonData.species.url);
              const speciesData = await speciesResponse.json();
    
              const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
              const evolutionChainData = await evolutionChainResponse.json();
    
              const evolutionImages = [];
    
              const traverseEvolutionChain = (chain) => {
                const { species, evolves_to } = chain;
    
                const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${species.url.split("/").slice(-2, -1)}.svg`;
    
                evolutionImages.push({
                  pokemon: species.name,
                  image: image
                });
    
                evolves_to.forEach(evolution => {
                  traverseEvolutionChain(evolution);
                });
              };
    
              traverseEvolutionChain(evolutionChainData.chain);
    
              setEvolutionImages(evolutionImages);
            } catch (error) {
              console.log("Error fetching evolution chain", error);
            }
          }
        };
    
        fetchEvolutionChain();
      }, [pokemonData]);
    
      if (!pokemonData) {
        return <p>Loading...</p>;
      }

      const { name: pokemonName, sprites, types, aboutText } = pokemonData;
      const imageUrl = sprites.other.dream_world.front_default;

      const getPokemonTypeImage = (typeName) =>{
        switch(typeName){
            case "grass":
                return{
                    image: pokemontypegrass,
                    className: "pokemontypegrass"
                }
            case "poison":
                return{
                    image: pokemontypepoison,
                    className: "pokemontypepoison"
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
                case "flying":
                    return{
                        image: pokemontypeflying,
                        className: "pokemontypeflying",
                    }
                default:
                    return "";
        }
      }


    const getPokemonTypeInfoCardBackgroundColor = (types) => {
        if (types && types.length > 0) {
          const typeName = types[0].type.name;
          
          switch (typeName) {
            case "grass":
              return {
                className: "pokemontypegrassbg"
              };
            case "fire":
              return {
                className: "pokemontypefirebg"
              };
            case "water":
              return {
                className: "pokemontypewaterbg"
              };
            case "bug":
              return {
                className: "pokemontypebugbg"
              };
            case "normal":
              return {
                className: "pokemontypenormalbg"
              };
            default:
              return "";
          }
        }
      
        return "";
    };

    return(
        <>
                <div className="pokemoninfo-header">
                  <Header includeScrollFunctionality={false} changeColor={changeColor} handleChangeColor={handleChangeColor} />
                </div>
                <div className="pokemoninfo_content">
                    {showLoader ? (
                        <div className="container skeleton-container">
                            <PokemonInfoSkeletonLoader />
                        </div>
                    ):(
                    pokemonData && (
                        <>
                        <div className={`container pokemon-container ${getPokemonTypeInfoCardBackgroundColor(types).className} `}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="pokemon-details-container">
                                        <h2 className="pokemon_name">{pokemonData.name}</h2>
                                        <img src={imageUrl} alt={pokemonName} />
                                        <ul className="pokemoninfo-type">
                                            {
                                                types.map((type)=>(
                                                    <li>{type.type.name}</li>
                                                ))
                                            }
                                        </ul>
                                        <ul className="pokemoninfo-type-image">
                                            {
                                                types.map((type)=>(
                                                    <li className={`pokemon-type-bg ${getPokemonTypeImage(type.type.name).className}`}><img src={getPokemonTypeImage(type.type.name).image} alt={type.name}/></li>
                                                ))
                                            }
                                        </ul>
                                        <p className="pokemon_height"><b>Height:</b> {pokemonData.height}m</p>
                                        <p className="pokemon_weight"><b>Weight:</b> {pokemonData.weight}kg</p>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <h2 className="pokemon-aboutus-heading">About</h2>
                                    <p className="pokemon-aboutus">{aboutText}</p>
                                    <h2 className="pokemon-abilities-heading">Abilities</h2>
                                    <div className="pokemon-ability">
                                        <ul className="pokemon-ability-list">
                                            {
                                                pokemonData.abilities.map((ability)=>(
                                                    <li>{ability.ability.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <h4 className="pokemon-base-stat-heading">Base Stats</h4>
                                    <div className="pokemon-stats">
                                        {
                                            pokemonData.stats.map((stat)=>(
                                                <>
                                                    <div className="pokemon-stats-list">
                                                        <p key={stat.stat.name} className="pokemon-stat-heading">{stat.stat.name}</p>
                                                        <p className="pokemon-stat-number">{stat.base_stat}</p>
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                    <h3 className="evolution-heading">Evolution</h3>
                                    <div className="evolution_box">
                                        {evolutionImages.map((evolution, index) => (
                                            <div>
                                                <div className="pokemon-evolution-box">
                                                    <div className="pokemon-evolution-image">
                                                        <img className="evolution_image" src={evolution.image} alt={evolution.pokemon} />
                                                    </div>
                                                    {index !== evolutionImages.length - 1 && <i className="fa fa-long-arrow-right"></i>}
                                                </div>
                                                <div>
                                                    <p className="pokemon-evolution-name">{evolution.pokemon}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    ))}
                </div>
                <Footer />
        </>
    )
}
export default PokemonInfo;