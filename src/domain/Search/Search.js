import React, {useState} from "react";
import {fetchApi} from "../../utils/utils";
import EventsList from "../../components/EventList/EventsList";

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
            {events && <EventsList events={events.records}/>}
        </section>
    )
}
export default Search;