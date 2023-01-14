export default async function handler(req, res) {
    const { thumbnail } = req.query
    const searchResult = { poster: `https://api.animeiat.co/storage/thumbnails/${thumbnail.join('/')}` }
    res.status(200).json(searchResult)
}