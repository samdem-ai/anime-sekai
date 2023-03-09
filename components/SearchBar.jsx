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

            <form className="search-form" onSubmit={(e) => {
                e.preventDefault();
                // setSearch(e.target.value);
                window.location.href = `/${search}`
            }}>
                <img src="/assets/Search.svg" alt="search icon" className="search-icon" />
                <input type="text" className="search-bar" name="animeSearch" id="animeSearch"
                    placeholder="Search for animes or movies" onChange={handleChange} o />
                <a className="search-button" href={`/${search}`}>Search</a>
            </form>
        </>

    );
}

export default SearchBar;