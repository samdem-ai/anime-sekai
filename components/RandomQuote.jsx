import './RandomQuote.css'
import Image from 'next/image';

async function fetchRandomQuote() {
    const result = fetch('https://kyoko.rei.my.id/api/quotes.php')
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('something went wrong')
        }).then((data) => {
            return data.apiResult[0]
        }).catch((e) => {
            // console.log(e);
        });
    return result
}



const RandomQuote = async () => {
    const result = await fetchRandomQuote()
    return (
        <div className="random-quote">
            <h1 className='random-quote__title'>Random Quote</h1>
            <p className="anime__quote">{result.english}</p>
            <h2 className="anime__character">- {result.character}, {result.anime}</h2>
            <div className="anime-image__container">
                <Image className='anime__image' src="/assets/goku.png" alt="goku" width={150} height={400} />
            </div>
        </div>
    );
}

export default RandomQuote;