async function infoAnime(anime) {
    const result = fetch(`https://api.animeiat.co/v1/anime/${anime}`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            return data
        })
    return result
}



export default async function handler(req, res) {
    const { info } = req.query
    const searchResult = await infoAnime(info)
    res.status(200).json(searchResult.data)
}