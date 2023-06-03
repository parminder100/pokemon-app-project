import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PokemonNewsSkeletonLoader = () =>{
    return(
        <>
            <Skeleton width={550} height={286} />
        </>
    )
}
export default PokemonNewsSkeletonLoader;