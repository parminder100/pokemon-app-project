import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import pokedex from "../../Assets/img/pokedex.png";
import bg from "../../Assets/img/bg.png";
import "../Header/Header.css";
import { Link } from 'react-router-dom';

const Header = ({pokemonInput, handlePokemonInput, includeScrollFunctionality = true, handleChangeColor={handleChangeColor}}) =>{
    const [isBackgroundBgVisible, setIsBackgroundBgVisible] = useState(true);
    const [showInputField, setShowInputField] = useState(false);
    const [isBelowSlider, setIsBelowSlider] = useState(false);

    const handleBackgroundBg = () =>{
        setIsBackgroundBgVisible(!isBackgroundBgVisible);
        if(!isBackgroundBgVisible){
            document.body.style.backgroundImage = `url(${bg})`;
            document.body.style.backgroundColor = "initial";
        }
        else{
            document.body.style.backgroundImage = "unset";
            document.body.style.backgroundColor = "#16171f";
        }
    }

    const handleShowInputField = () =>{
        setShowInputField(!showInputField);
    }

    useEffect(() => {
        if (!includeScrollFunctionality) {
            return;
        }
        const handleScroll = () => {
          const sliderHeight = document.getElementById("slider").offsetHeight;
          const scrollPosition = window.scrollY;
          setIsBelowSlider(scrollPosition > sliderHeight);
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [includeScrollFunctionality]);

    return(
        <>
            <header >
                <div className={`header-bg ${isBelowSlider ? "black-bg" : ""}`}>
                    <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-1">
                            <div style={{background: isBackgroundBgVisible ? "hsl(230deg 17% 85%)" : "linear-gradient(90deg,hsl(216deg 52% 48%),hsl(51deg 100% 60%))" }} onClick={()=>{handleBackgroundBg(); handleChangeColor();}} className="toggle-bg"  >
                                <div className='toggle-thumb'>
                                    <i className={`fa ${isBackgroundBgVisible ? "fa-sun-o" : "fa-moon-o"}`}></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className='text-end'>
                                <img className='pokedex-logo' src={pokedex} alt="pokedex.png"/>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <ul className='navbar-list'>
                                <li>
                                    <div className='pokemon-search-input'>
                                        <input className={`pokemon-input ${showInputField ? "visible-input": ""}`} style={{width: showInputField ? "200px" : ""}} type="text" value={pokemonInput} onChange={handlePokemonInput} placeholder="Enter Pokemon Name" />
                                        <i onClick={handleShowInputField} className={`fa fa-search ${!isBackgroundBgVisible ? "dark-theme": ""}`} style={{color: showInputField ? "#000" : ""}}></i>
                                    </div>
                                </li>
                                <Link to="/"><li className='active'>Home</li></Link>
                                <Link to="/aboutus"><li>About Us</li></Link>
                                <Link to="/movies"><li>Movies</li></Link>
                                <Link to="/news"><li>News</li></Link>
                                <Link to="/contactus"><li>Contact Us</li></Link>
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header;