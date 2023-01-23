import './Recommended.css'
async function fetchRecommended() {
    const result = fetch('http://localhost:3000/api/anime/recommended')
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
    const result = await fetchRecommended()

    return (
        <div className="recommended">
            <h2 className="recommended__title">Recommended</h2>
            <div className="recommended__container">
                {result.map((anime) => (
                    <a href="#" key={anime.anime_name} style={{ backgroundImage: `url(${anime.poster_path})` }} className="anime__card">
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