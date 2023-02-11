'use client'
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import './animeEpisode.css'
import { fetchAnimeInfo, fetchOngoingAnime, downloadImage } from "../../fetchAnimeInfo";


(function () {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();


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
            const result = fetch(`http://anime-sekai-api.vercel.app/api/anime/watch/${currentPath}`)
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
                            // {
                            //     src: anime['360p'],
                            //     poster: anime.thumbnail,
                            //     size: 360,

                            // },
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
                    <button onClick={() => downloadImage(anime['480p'], anime.title + ' 480p').then(() => { alert('done'); })
                    } className="btn btn-primary">Download Image</button>

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
                                <p className="anime-info__more">Studio: {animeInfo.studios[0].name}</p>
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