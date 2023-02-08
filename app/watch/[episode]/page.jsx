'use client'
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import './animeEpisode.css'
import fetchAnimeInfo from "../../fetchAnimeInfo";



export default function Home() {
    const [anime, setAnime] = useState()
    const [allEpisodes, setAllEpisodes] = useState()
    const [totalEpisodes, setTotalEpisodes] = useState()
    const [animeInfo, setAnimeInfo] = useState()
    const currentPath = usePathname().substring(7)
    const animeSlug = currentPath.substring(0, currentPath.indexOf('-episode'))
    const animeEpisode = currentPath.substring(currentPath.lastIndexOf('-') + 1, currentPath.length)

    useEffect(() => {
        async function fetchEpisode() {
            const result = fetch(`http://localhost:3000/api/anime/watch/${currentPath}`)
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
            setAnimeInfo(animeInfo)
            if (!allEpisodes && animeInfo && animeInfo.status === 'ongoing') {
                const result = fetch(`https://api-consumet.vercel.app/anime/gogoanime/info/${animeSlug}`)
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        }
                        throw new Error('something went wrong')
                    }).then((data) => {
                        // console.log(data)
                        return data
                    }).catch((e) => {
                        // console.log(e);
                    });
                const episodesInfo = await result
                setTotalEpisodes(episodesInfo)
                totalEpisodes && setAllEpisodes(Array.from({ length: await totalEpisodes.totalEpisodes }, (v, k) => k + 1))
                console.log(allEpisodes)
            } else if (!allEpisodes) {
                setAllEpisodes(Array.from({ length: animeInfo.total_episodes }, (v, k) => k + 1))
            }

        }
        fetchEpisode()
        // async function fetchAllEpisodes() {
        //     const result = fetch(`http://localhost:3000/api/anime/episodes/${animeSlug}`)
        //         .then((response) => {
        //             if (response.ok) {
        //                 return response.json()
        //             }
        //             throw new Error('something went wrong')
        //         }).then((data) => {
        //             return data
        //         }).catch((e) => {
        //             // console.log(e);
        //         });
        //     setAllEpisodes(...allEpisodes, await result)
        // }
        // fetchAllEpisodes()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalEpisodes])



    // if (animeInfo && animeInfo.status === 'ongoing') {

    // }

    return (
        <main className='page episode-page'>
            <div className="grid-layout">
                {animeInfo && anime && <div>
                    <h1 className="text-white h3 mb-3">{anime.title}</h1>
                    <Plyr source={{
                        type: "video",
                        sources: [
                            {
                                src: anime['720p'],
                                poster: anime.thumbnail,
                                size: 720,

                            },
                            {
                                src: anime['480p'],
                                poster: anime.thumbnail,
                                size: 480,

                            },
                            {
                                src: anime['1080p'],
                                poster: anime.thumbnail,
                                size: 1080,

                            },

                        ]
                    }} />
                    {/* <button onClick={() => { fileDownload(anime['480p'], anime.title) }}>download</button> */}
                </div>}
                {
                    animeInfo && allEpisodes && (allEpisodes.length === parseInt(animeInfo.total_episodes) || allEpisodes.length === parseInt(totalEpisodes.totalEpisodes)) && <div className="list-group">
                        {allEpisodes.map((episode) => (
                            <a href={`${animeSlug}-episode-${episode}`} key={episode} className={episode == animeEpisode ? 'bg list-group-item list-group-item-action active' : 'bg list-group-item list-group-item-action'}>
                                {`Episode ${episode}`}
                            </a>
                        ))}
                    </div>
                }
                {
                    allEpisodes && console.log(allEpisodes)
                }

            </div>
        </main>
    )
}