
async function searchAnime(query) {
    const result = fetch(`https://api.animeiat.co/v1/anime?q=${query}`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            return data
        })
    return result
}


export default async function handler(req, res) {
    const { query } = req.query
    const searchResult = await searchAnime(query)
    res.status(200).json(searchResult.data)
}