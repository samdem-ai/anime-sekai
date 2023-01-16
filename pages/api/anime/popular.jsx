async function recommended() {
    const result = fetch(`https://kitsu.io/api/edge/trending/anime`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            return data
        })
    return result
}


export default async function handler(req, res) {
    const searchResult = await recommended()
    const response = searchResult.data.map((elm) => {
        // console.log(elm);
        return {
            slug: elm.attributes.slug,
            poster: elm.attributes.posterImage.original,
            cover: elm.attributes.coverImage.original,
            title: elm.attributes.titles.en_jp
        }
    })
    res.status(200).json(response)
}