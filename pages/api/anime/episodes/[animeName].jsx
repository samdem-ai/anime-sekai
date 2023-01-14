
async function searchAnimeEpisodes(anime, page) {
    const result = fetch(`https://api.animeiat.co/v1/anime/${anime}/episodes?page=${page}`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            return data
        })
    return result
}


export default async function handler(req, res) {
    const { animeName, page } = req.query
    const searchResult = await searchAnimeEpisodes(animeName, page)
    res.status(200).json(searchResult.data)
}