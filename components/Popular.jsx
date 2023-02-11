import './Popular.css'


async function fetchPopularAnime() {
    const result = fetch('http://localhost:3000/api/anime/popular')
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

// async function fetchAnimeInfo(popular) {
//     let response = []
//     for (const elm of popular) {
//         const result = await fetch(`http://localhost:3000/api/anime/info/${elm.slug}`)
//             .then((response) => {
//                 if (response.ok) {
//                     return response.json()
//                 }
//                 console.log('Looks like there was a problem. Status Code: ' +
//                     response.status);
//                 return
//             }).then((data) => {
//                 return data
//             }).catch((e) => {
//                 console.log(e);
//             });

//         if (await result) {
//             response.push(result)
//         }
//     }
//     return response
// }


export default async function Popular() {
    const result = await fetchPopularAnime()
    // const l = await fetchAnimeInfo(result)
    if (result) {
        return (
            <div id="carouselExample popular" className="carousel slide mt-5" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {result.map((anime) => (
                        <div key={anime.id} className={result.indexOf(anime) == 0 ? "slider carousel-item active" : "slider carousel-item"} style={{ backgroundImage: `url(${anime.cover})` }}>
                            <div className="slider-container">
                                <div className="title-container">
                                    <h1 className='slider__title'>{anime.title}</h1>
                                </div>
                                {/* <Image className='slider__image' src={`${anime.cover}`} alt="poster" fill={true} /> */}
                                <button className='rounded-pill  button-watch text-white'>watch
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="play-icon" viewBox="0 0 16 16">
                                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                    </svg></button>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        )
    }
}