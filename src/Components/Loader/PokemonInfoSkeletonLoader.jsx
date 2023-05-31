import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PokemonInfoSkeletonLoader = () =>{
    return(
        <>
            <Skeleton width={849} height={665} />
        </>
    )
}
export default PokemonInfoSkeletonLoader;