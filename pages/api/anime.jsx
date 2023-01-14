export default function handler(req, res) {
    res.send('welcome to the anime endpoint! You can use the end points to go around and enjoy this api {/watch/anime-episode-id, /:query, /popular, /recent, /info/anime-name(slug)}')
}