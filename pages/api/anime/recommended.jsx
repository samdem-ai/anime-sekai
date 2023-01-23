async function recommended() {
    const result = fetch(`https://api.animeiat.co/v1/home`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            return data
        })
    return result
}


export default async function handler(req, res) {
    const searchResult = await recommended()
    for (const i in searchResult.data) {
        searchResult.data[i].poster_path = `https://api.animeiat.co/storage/${searchResult.data[i].poster_path}`
    }
    res.status(200).json(searchResult.data)
}