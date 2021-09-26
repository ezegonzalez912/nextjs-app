import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useContext, useEffect, useState } from 'react'
import StarRating from 'react-svg-star-rating'
import { ArrowUp } from '../components/ui/Assets/ArrowUp'
import { ArrowDown } from '../components/ui/Assets/ArrowDown'
import { Modal } from '../components/modal/Modal'
import { modalContext } from '../context/Modal/modalContext'
import { useRouter } from 'next/router'
import { firebaseContext } from '../context/firebase/firebaseContext'
import { NavBar } from '../components/ui/Navbar/NavBar'

const Home: NextPage = (props: any) => {

  const { results } = props.moviesTrending; 

  const [currentMovie, setCurrentMovie] = useState(0)
  const [movieActive, setMovieActive] = useState(results[currentMovie])

  useEffect(() => {
    setMovieActive(results[currentMovie])
  }, [currentMovie])

  const average = movieActive.vote_average * 0.5 

  const prevMovie = () => {
    if(currentMovie !== 0){
      setCurrentMovie(currentMovie - 1)
    }
  }

  const nextMovie = () => {
    if((results.length - 1) !== currentMovie){
      setCurrentMovie(currentMovie + 1)
    }
  }

  const router = useRouter();

  const { user } = useContext(firebaseContext)
  const { handleOpenModal } = useContext(modalContext)

  const handlePlay = () => {
    if(user){
      return router.push(`/player/${movieActive.id}`)
    }
    handleOpenModal()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Practice Next.js</title>
        <meta name="description" content="Practice Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal />
      <main className={styles.main} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieActive.backdrop_path})`}}>
        <NavBar />
        <div className={styles.grid}>
          <section className={styles.section}>
            <h1>{movieActive.original_name || movieActive.original_title}</h1>
            <StarRating initialRating={average} activeColor="white" emptyColor="#ffffff4c"isReadOnly={true} unit="half" />
            <p>{movieActive.overview}</p>
            <p className={styles.language}>{movieActive.original_language.toLocaleUpperCase()}</p>
            <button onClick={handlePlay}>PLAY</button>
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
    </div>
  )
}

export default Home

export async function getServerSideProps() {

  const moviesTrending = await fetch("https://api.themoviedb.org/3/trending/all/day?api_key=09b4df40215aa02cfcbd383f6e8cffef")
  .then(res => res.json())
  .then(res => res)

  return {
    props: { moviesTrending }
  }
}