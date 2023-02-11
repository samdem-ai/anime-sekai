import { createWriteStream } from 'streamsaver';

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

async function downloadImage(url, fileName) {
    return fetch(url).then(res => {
        const fileStream = createWriteStream(`${fileName}.mp4`);
        const writer = fileStream.getWriter();
        if (res.body.pipeTo) {
            writer.releaseLock();
            return res.body.pipeTo(fileStream);
        }

        const reader = res.body.getReader();
        const pump = () =>
            reader
                .read()
                .then(({ value, done }) => (done ? writer.close() : writer.write(value).then(pump)));

        return pump();
    });
}

export { fetchAnimeInfo, fetchOngoingAnime, downloadImage }