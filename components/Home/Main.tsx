import { useRouter } from 'next/router'
import { useContext } from 'react'
import { firebaseContext } from '../../context/firebase/firebaseContext'
import { modalContext } from '../../context/Modal/modalContext'
import styles from '../../styles/Home.module.scss'
import { ArrowDown } from '../../Assets/ArrowDown'
import { ArrowUp } from '../../Assets/ArrowUp'
import { NavBar } from '../ui/Navbar/NavBar'
import StarRating from 'react-svg-star-rating'
import { Movie } from '../../types'

interface Props {
    movie: Movie;
    prevMovie: () => void;
    nextMovie: () => void;
}

export const Main:React.FC<Props> = ({movie, prevMovie, nextMovie}) => {

    const { user } = useContext(firebaseContext);
    const { handleOpenModal } = useContext(modalContext);
    const router = useRouter();

    const average: number = movie.vote_average * 0.5 

    const handlePlay = () => {
        if(user){
          return router.push(`/player/${movie.id}`)
        }
        handleOpenModal()
    }

    return (
        <main className={styles.main} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}}>
          <NavBar />
          <div className={styles.grid}>
            <section className={styles.section}>
              <h1 className={styles.title}>{movie.original_name || movie.original_title}</h1>
              <div className={styles.stars}>
                <StarRating initialRating={average} activeColor="white" emptyColor="#ffffff4c"isReadOnly={true} unit="half" />
              </div>
              <p>{movie.overview}</p>
              <p className={styles.language}>{movie.original_language.toLocaleUpperCase()}</p>
              <button onClick={handlePlay}>{movie.video === undefined ? "COMING SOON..." : "PLAY"}</button>
            </section>
            <div className={styles.controls}>
              <button onClick={nextMovie}>
                <ArrowUp />
              </button>
              <button onClick={prevMovie}>
                <ArrowDown />
              </button>
            </div>
          </div>
        </main>
    )
}
