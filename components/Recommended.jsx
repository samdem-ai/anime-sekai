import './Recommended.css'
async function fetchRecommended() {
    const result = fetch('https://corsanywhere.herokuapp.com/https://anime-sekai-api.vercel.app/api/anime/recommended')
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
    return result
}



const Recommended = async () => {
    const RecommendedAnime = await fetchRecommended()

    return (
        <div className="recommended">
            <h2 className="recommended__title">Recommended</h2>
            <div className="recommended__container">
                {RecommendedAnime.map((anime) => (
                    <a href={`/watch/${anime.slug}-episode-1`} key={anime.anime_name} style={{ backgroundImage: `url(${anime.poster_path})` }} className="anime__card">
                        {/* <div className="anime__status">{anime.status}</div> */}
                        <div className="anime__type">{anime.type}</div>
                        <p className="anime__title">{anime.anime_name}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Recommended;