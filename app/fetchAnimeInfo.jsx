// import download from 'downloadjs';
// import { createWriteStream } from 'streamsaver'

async function fetchAnimeInfo(animeName) {
    const result = fetch(`https://corsanywhere.herokuapp.com/https://anime-sekai-api.vercel.app/api/anime/info/${animeName}`)
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
    const result = fetch(`https://corsanywhere.herokuapp.com/https://api-consumet.vercel.app/anime/gogoanime/info/${animeName}`)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('something went wrong')
        }).then((data) => {
            return { data: data, status: 'ok' }
        }).catch((e) => {
            return { data: 'fetch error', status: 'error' }
        });
    const res = await result
    return await res
}

// async function fetchAllEpisodes(animeName) {
//     const result = fetch(`https://cdn.animeiat.tv/files/35278/%5BAnimeiat.co%5DBlue_Lock_-_EP02%5B720p%5D.mp4`)
//         .then((response) => {
//             if (response.ok) {
//                 return response.json()
//             }
//             throw new Error('something went wrong')
//         }).then((data) => {
//             return { data: data, status: 'ok' }
//         }).catch((e) => {
//             return { data: 'fetch error', status: 'error' }
//         });
//     const res = await result
//     return await res
// }

// async function downloadImage(url, fileName) {
//     download('https://corsanywhere.herokuapp.com/' + url)
//     console.log(url)
// }

export { fetchAnimeInfo, fetchOngoingAnime }