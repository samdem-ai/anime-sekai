import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import "./NewestRelease.css"


async function fetchNewestRelease() {
    const result = fetch('http://localhost:3000/api/anime/new-release')
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
                    <a href="#" key={anime.id} className="anime__card" style={{ backgroundImage: `url(${anime.poster})` }}>
                        <p className="anime__title">{anime.title}</p>
                    </a>
                ))}
            </div>
        </div>
    )
}