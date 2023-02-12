import "./NewestRelease.css"


async function fetchNewestRelease() {
    const result = fetch('https://anime-sekai-api.vercel.app/api/anime/new-release', { next: { revalidate: 3600 } })
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

export default async function NewestRelease() {
    const result = await fetchNewestRelease()

    return (
        <div className="newest-release">
            <h2 className="newest-release__title">Latest Episodes</h2>
            <div className="newest-release__container">
                {result.map((anime) => (
                    <a href={`/watch/${anime.slug}`} key={anime.id} className="anime__card" style={{ backgroundImage: `url(${anime.poster})` }}>
                        <p className="anime__title">{anime.title}</p>
                    </a>
                ))}
            </div>
        </div>
    )
}