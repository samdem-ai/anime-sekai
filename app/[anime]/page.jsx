import { fetchAnimeInfo } from '../fetchAnimeInfo'


export default async function Anime({ params }) {
    const animeInfo = await fetchAnimeInfo(params.anime)
    return (
        <main className='page episode-page'>
            <div className="flex justify-content-center mt-5">
                {console.log(animeInfo)}
                <p className='text-white text-end '>{animeInfo.story}</p>
            </div>
        </main>
    )
}