import React, {useEffect, useState} from "react";
import {fetchApi} from "../../utils/utils";
import EventsList from "../../components/EventList/EventsList";
import InfiniteScroll from "../../components/EventsInfinite/EventsInfinite";
import EventsInfinite from "../../components/EventsInfinite/EventsInfinite";
import './Search.scss'
import {useParams} from "react-router-dom/cjs/react-router-dom";

const Search = ({location}) => {
    let query = useParams().query
    return (
        <section className="page page-search">
            {query ? <EventsInfinite query={query} /> : <div className="empty-query"><h2>Que recherchez vous ?</h2></div>}
        </section>
    )
}
export default Search;