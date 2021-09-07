import React, {useState} from "react";
import {fetchApi} from "../../utils/utils";

const Search = () => {
    const [query, setQuery] = useState("")
    const [events, setEvents] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchApi(setEvents, "/records?search=" + query)
    }
    return (
        <section className="page page-search">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Rechercher..." onInput={(e) => setQuery(e.target.value)} value={query}/>
                <button type="submit">Rechercher</button>
            </form>
        </section>
    )
}
export default Search;