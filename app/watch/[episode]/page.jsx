'use client'
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import './animeEpisode.css'
import { fetchAnimeInfo, fetchOngoingAnime } from "../../fetchAnimeInfo";
import SearchBar from "../../../components/SearchBar";

export default function Home() {
    const [anime, setAnime] = useState()
    const [allEpisodes, setAllEpisodes] = useState()
    const [totalEpisodes, setTotalEpisodes] = useState()
    const [animeInfo, setAnimeInfo] = useState()
    const currentPath = usePathname().substring(7)
    const animeSlug = currentPath.substring(0, currentPath.indexOf('-episode'))
    const animeEpisode = currentPath.substring(currentPath.lastIndexOf('-') + 1, currentPath.length)

    // const [progress, setProgress] = useState(0);

    // const downloadVideo = async () => {
    //     NProgress.start();
    //     const response = await fetch('https://corsanywhere.herokuapp.com/https://cdn.animeiat.tv/files/35278/%5BAnimeiat.co%5DBlue_Lock_-_EP02%5B360p%5D.mp4');
    //     const total = parseInt(response.headers.get('Content-Length'), 10);
    //     console.log(total)
    //     const reader = response.body.getReader();
    //     let loaded = 0;

    //     while (true) {
    //         const { done, value } = await reader.read();
    //         if (done) {
    //             break;
    //         }
    //         loaded += value.length;
    //         setProgress((loaded / total) * 100);
    //     }

    //     NProgress.done();
    //     // Save the video to the local file system
    // };


    useEffect(() => {
        async function fetchEpisode() {
            const result = fetch(
                `https://corsanywhere.herokuapp.com/https://anime-sekai-api.vercel.app/api/anime/watch/${currentPath}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('something went wrong')
                }).then((data) => {
                    return data
                }).catch((e) => {
                    // console.log(e);
                });

            setAnime(await result)


            const animeInfo = await fetchAnimeInfo(animeSlug)
            setAnimeInfo(await animeInfo)

            if (!allEpisodes && animeInfo && animeInfo.status === 'ongoing') {

                const episodesInfo = await fetchOngoingAnime(animeSlug)

                if (await episodesInfo.status === 'ok') {
                    setTotalEpisodes(episodesInfo.data)
                    totalEpisodes && setAllEpisodes(
                        Array
                            .from(
                                { length: await totalEpisodes.totalEpisodes },
                                (v, k) => k + 1
                            ))
                }
            } else if (!allEpisodes) {
                setAllEpisodes(
                    Array
                        .from({ length: animeInfo.total_episodes },
                            (v, k) => k + 1
                        ))
            }

        }
        fetchEpisode()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalEpisodes])


    return (
        <main className='page episode-page'>
            <div className="grid-layout">
                {animeInfo && anime && <div>
                    <h1 className="text-white h3 mb-3">{anime.title}</h1>
                    <Plyr source={{
                        type: "video",
                        sources: [
                            anime['360p'] !== '' ? {
                                src: anime['360p'],
                                poster: anime.thumbnail,
                                size: 360,

                            } : {},
                            anime['720p'] !== '' ? {
                                src: anime['720p'],
                                poster: anime.thumbnail,
                                size: 720,

                            } : {},
                            anime['480p'] !== '' ? {
                                src: anime['480p'],
                                poster: anime.thumbnail,
                                size: 480,

                            } : {},
                            anime['1080p'] !== '' ? {
                                src: anime['1080p'],
                                poster: anime.thumbnail,
                                size: 1080,

                            } : {},

                        ]
                    }} />

                </div>}
                {
                    animeInfo && allEpisodes &&
                        (allEpisodes.length === parseInt(animeInfo.total_episodes) ||
                            allEpisodes.length === parseInt(totalEpisodes.totalEpisodes)) ?

                        <div className="list-group">
                            {allEpisodes.map((episode) => (
                                <a href={`${animeSlug}-episode-${episode}`} key={episode} className={
                                    episode == animeEpisode ?
                                        'bg list-group-item list-group-item-action active' :
                                        'bg list-group-item list-group-item-action'}>
                                    {`Episode ${episode}`}
                                </a>
                            ))}
                        </div> :

                        <div className="list-group placeholder-glow">
                            <div className="placeholder placeholder-anime-episodes "></div>
                        </div>
                }
                {animeInfo && <div className="anime-info">
                    <div className="anime-info__content text-white">
                        <h1 className="anime-info__title">{animeInfo.anime_name}</h1>
                        <div className="anime-genre-container">
                            {animeInfo.genres.map((genre) => (
                                <span key={genre.name} className="anime-genre">{genre.name} </span>
                            ))}
                        </div>
                        <p className="anime-info__story">{animeInfo.story}</p>
                        <div className="anime-info__grid">
                            <div className="anime-info__col">
                                <p className="anime-info__more">age: {animeInfo.age}</p>
                                <p className="anime-info__more">type: {animeInfo.type}</p>
                                <p className="anime-info__more">status: {animeInfo.status}</p>
                            </div>

                            <div className="anime-info__col">
                                <p className="anime-info__more">year: {animeInfo.year.name}</p>
                                <p className="anime-info__more">Episodes: {animeInfo.total_episodes ? animeInfo.total_episodes : '?'}</p>
                                <p className="anime-info__more">Studio: {animeInfo.studios.length != 0 ? animeInfo.studios[0].name : ''}</p>
                            </div>
                        </div>
                    </div>
                    {/*eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://api.animeiat.co/storage/${animeInfo.poster_path}`} alt="anime poster" className="anime-poster" />
                </div>}
            </div>
        </main >
    )
}