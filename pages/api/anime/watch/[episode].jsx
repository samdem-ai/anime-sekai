function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
}


async function fetchEpisode(episode) {
    const result = fetch(`https://api.animeiat.co/public/v1/episode/${episode}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('something went wrong')
        })
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.log(e);
        });
    return result;
}


export default async function handler(req, res) {
    const { episode } = req.query;
    const searchResult = await fetchEpisode(episode);
    if (searchResult) {

        let title = searchResult.data.title.replace(/[\W_]+/g, " ");
        const epTitleNumber =
            "-_EP" + pad(title.split(" ")[title.split(" ").length - 2], 2);
        title = title.split(" ");
        title.pop();
        title[title.length - 1] = epTitleNumber;
        title = title.join("_");
        const videoId = searchResult.data.video_id;
        const epLinks = {
            title: searchResult.data.title,
            thumbnail: searchResult.data.poster_path,
            "480p": `https://cdn.animeiat.tv/files/${videoId}/\/%5BAnimeiat.co%5D${title}%5B480p%5D.mp4`,
            "720p": `https://cdn.animeiat.tv/files/${videoId}/\/%5BAnimeiat.co%5D${title}%5B720p%5D.mp4`,
            "1080p": `https://cdn.animeiat.tv/files/${videoId}/\/%5BAnimeiat.co%5D${title}%5B1080p%5D.mp4`,
        };
        res.status(200).json(epLinks)
    } else {
        res.status(404).send('oh noo something went wrong');
    }
}
