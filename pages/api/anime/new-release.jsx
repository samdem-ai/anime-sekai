async function newAnime() {
    const result = await fetch(`https://api.animeiat.co/v1/home/sticky-episodes`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            return data
        })
    for (const i in await result.data) {
        const slug = result.data[i].slug.replace(result.data[i].slug.substr(result.data[i].slug.indexOf('-episode-')), '');
        const poster = fetch(`https://api.animeiat.co/v1/anime/${slug}`)
            .then((response) => {
                return response.json()
            }).then((data) => {
                const link = `https://api.animeiat.co/storage/${data.data.poster_path}`
                return link
            })
        result.data[i].poster = await poster
    }
    return result

}


export default async function handler(req, res) {
    const searchResult = await newAnime()
    res.status(200).json(searchResult.data)
}