import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PokemonMoviesSkeletonLoader = () =>{
    return(
        <>
            <Skeleton width={261} height={442} />
        </>
    )
}
export default PokemonMoviesSkeletonLoader;