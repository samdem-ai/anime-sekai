
async function searchAnimeEpisodes(anime) {
    const result = fetch(`https://api.animeiat.co/v1/anime/${anime}/episodes`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            return data
        })
    return result
}




export default async function handler(req, res) {
    const { animeName } = req.query
    const searchResult = await searchAnimeEpisodes(animeName)
    res.status(200).json(searchResult.data)
}