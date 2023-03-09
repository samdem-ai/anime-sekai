"use client"
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
// import SearchBar from '../../components/SearchBar'
import "./Search.css"


const Search = () => {
    const [searchResult, setSearchResult] = useState();
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [lastPage, setLastPage] = useState();
    const [animeList, setAnimeList] = useState();
    const path = usePathname();

    useEffect(() => {
        if (!searchResult) {
            const fetchSearch = async (query) => {
                const result = fetch(`https://corsanywhere.herokuapp.com/https://anime-sekai-api.vercel.app/api/anime/${query}`)
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

                setSearchResult(await res)
            }
            fetchSearch(path)
        }

        searchResult && setTotalPages(
            Array.from(
                { length: searchResult.meta.last_page },
                (v, k) => k + 1
            ))
        if (searchResult) {
            setCurrentPage(searchResult.meta.current_page)
            setLastPage(searchResult.meta.last_page)
            setAnimeList(searchResult.data)
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResult])


    return (

        <div className="search-page page">
            <div className='search__container '>
                {animeList && animeList.length !== 0 &&
                    animeList.map((anime) => (
                        <a href={`/watch/${anime.slug}-episode-1`} key={anime.id} className="anime__card" style={{ backgroundImage: `url(https://api.animeiat.co/storage/${anime.poster_path})` }}>
                            <p className="anime__title">{anime.anime_name}</p>
                        </a>
                    ))


                }

            </div>

            <div className='state-container'>
                {
                    animeList && animeList.length == 0 ?
                        <h2 className='text-white search-text'>no result found</h2> :
                        !animeList ?
                            <div className='loading-section'>
                                <h2 className='text-white search-text'>Loading</h2>
                                <div className="spinner-border text-light" role="status"
                                    style={{ width: '5rem', height: '5rem', borderWidth: '.4rem' }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            : <></>
                }
            </div>

            {totalPages && animeList.length !== 0 && <Pagination currentPage={currentPage} className="pagination"
                totalPages={totalPages} lastPage={lastPage} path={path}></Pagination>}
        </div>
    );
}

export default Search;
