export default async function handler(req, res) {
    const { poster } = req.query
    const searchResult = { poster: `https://api.animeiat.co/storage/posters/${poster}` }
    res.status(200).json(searchResult)
}