import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PokemonListSkeletonLoader = () =>{
    return(
        <>
            <Skeleton width={261} height={320} />
        </>
    )
}
export default PokemonListSkeletonLoader;