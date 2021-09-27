import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useEffect, useState } from 'react'
import { Modal } from '../components/modal/Modal'
import { Main } from '../components/Home/Main'
import { Movie } from '../types'

interface Props {
  moviesTrending: {
    page: string
    results: Movie[]
  }
}

const Home: NextPage<Props> = (props) => {

  const { results } = props.moviesTrending; 

  const [currentMovie, setCurrentMovie] = useState(0)
  const [movieActive, setMovieActive] = useState(results[currentMovie])

  useEffect(() => {
    setMovieActive(results[currentMovie])
  }, [currentMovie])

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

  return (
    <div className={styles.container}>
      <Head>
        <title>Practice Next.js</title>
        <meta name="description" content="Practice Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal />
      <Main movie={movieActive} prevMovie={prevMovie} nextMovie={nextMovie} />
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