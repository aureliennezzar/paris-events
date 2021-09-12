import React, {useState} from "react";
import {fetchApi} from "../../utils/utils";
import EventsList from "../../components/EventList/EventsList";
import InfiniteScroll from "../../components/EventsInfinite/EventsInfinite";
import EventsInfinite from "../../components/EventsInfinite/EventsInfinite";
import './Search.scss'

const Search = () => {
    const [query, setQuery] = useState("")
    const [input, setInput] = useState("")
    const [events, setEvents] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
        setQuery(input)
    }
    return (
        <section className="page page-search">
            <form onSubmit={handleSubmit} className="search-form">
                <input type="text" placeholder="Rechercher..." onInput={(e) => setInput(e.target.value)} value={input}/>
                <button type="submit">Rechercher</button>
            </form>
            {query && <EventsInfinite query={query} />}
        </section>
    )
}
export default Search;