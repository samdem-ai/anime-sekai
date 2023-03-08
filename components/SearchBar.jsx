'use client'
import { useState } from "react";
import "./SearchBar.css"


const SearchBar = () => {
    const [search, setSearch] = useState("")

    function handleChange(e) {
        setSearch(e.target.value)
    }
    return (
        <>
            <img src="/assets/Search.svg" alt="search icon" className="search-icon" />
            <input type="text" className="search-bar" name="animeSearch" id="animeSearch"
                placeholder="Search for an animes or movies" onChange={handleChange} />
            <a className="search-button" href={search}>Search</a>
        </>

    );
}

export default SearchBar;