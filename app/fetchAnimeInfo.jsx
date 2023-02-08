async function fetchAnimeInfo(animeName) {
    const result = fetch(`http://localhost:3000/api/anime/info/${animeName}`)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('something went wrong')
        }).then((data) => {
            return data
        }).catch((e) => {
            // console.log(e);
        });
    const res = await result
    return await res
}

async function fetchOngoingAnime(animeName) {
    const result = fetch(`https://api-consumet.vercel.app/anime/gogoanime/info/${animeName}`)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('something went wrong')
        }).then((data) => {
            return data
        }).catch((e) => {
            // console.log(e);
        });
    const res = await result
    return await res
}

export default fetchAnimeInfo