import React, {useEffect, useState} from "react";
import {fetchApi} from "../../utils/utils";
import EventsList from "../../components/EventList/EventsList";
import InfiniteScroll from "../../components/EventsInfinite/EventsInfinite";
import EventsInfinite from "../../components/EventsInfinite/EventsInfinite";
import './Search.scss'
import {useParams} from "react-router-dom/cjs/react-router-dom";

const Search = ({location}) => {
    const [input, setInput] = useState("")
    const [events, setEvents] = useState([])
    let query = useParams().query
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     setQuery(input)
    // }
    return (
        <section className="page page-search">
            {/*<form onSubmit={handleSubmit} className="search-form">*/}
            {/*    <input type="text" placeholder="Rechercher..." onInput={(e) => setInput(e.target.value)} value={input}/>*/}
            {/*    <button type="submit">Rechercher</button>*/}
            {/*</form>*/}

            {query ? <EventsInfinite query={query} /> : <div className="empty-query"><h2>Que recherchez vous ?</h2></div>}
        </section>
    )
}
export default Search;