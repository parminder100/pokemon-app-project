const PokemonSearch = ({pokemonInput, handlePokemonInput}) =>{
    return(
        <>
            <div className="text-center">
                <input className="text-center" value={pokemonInput} onChange={handlePokemonInput} type="text" />
            </div>
        </>
    )
}
export default PokemonSearch;