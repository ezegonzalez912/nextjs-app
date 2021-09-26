import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import styles from '../../styles/Player.module.scss'
import { useRouter } from 'next/router'
import { ArrowBack } from '../../components/ui/Assets/ArrowBack'
import { firebaseContext } from '../../context/firebase/firebaseContext'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

interface Props {
    videos: any
}

const PlayerScreen: React.FC<Props> = ({videos}) => {

    const { user } = useContext(firebaseContext)
    const router = useRouter()

    useEffect(() => {
        if(user === null) router.push("/")
    }, [user])

    const goBack = () => router.push("/")

    const {key, name} = videos[0] ? videos[0] : {key: null, name: "Error"}

    if(user === undefined) return <SkeletonTheme color="#2c2b2b" highlightColor="#3a3939"><Skeleton height="99vh"/></SkeletonTheme>

    return (
        <div className={styles.container}>
            <Head>
                <title>{name}</title>
                <meta name="description" content="Practice Next.js" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <button onClick={goBack}>
                <ArrowBack />
            </button>
            <iframe  
                src={`https://www.youtube.com/embed/${key}?autoplay=1&modestbranding=1`}
                title={name}
                frameBorder="0"
                allowFullScreen
            />
        </div>
    )
}

export default PlayerScreen

export async function getServerSideProps(context: any) {

    const { id } = context.params

    const videos = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=09b4df40215aa02cfcbd383f6e8cffef&language=en-US`)
    .then(res => res.json())
    .then(res => res.results) || null

    return {
      props: { videos }
    }
  }