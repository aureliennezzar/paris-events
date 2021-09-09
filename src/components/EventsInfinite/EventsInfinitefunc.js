import React, {Component, useEffect, useRef, useState} from "react";
import axios from "axios";
import Event from "../Event/Event";


const EventsInfinite = ({query}) => {
    const [events, setEvents] = useState([])
    const [page, setPage] = useState(0)
    const [prevY, setPrevY] = useState(0.0)
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0);
    const loadingRef = useRef();

    // Additional css
    const loadingCSS = {
        height: "100px",
        margin: "30px"
    };

    // To change the loading icon behavior
    const loadingTextCSS = {display: loading ? "block" : "none"};

    useEffect(() => {
        getEvents(page);

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
        let observer = new IntersectionObserver(
            handleObserver,
            options
        );
        observer.observe(loadingRef.current);
    }, [])

    const handleObserver = (entities, observer) => {
        const y = entities[0].boundingClientRect.y;
        if (prevY > y && page <= count - 10) {
            getEvents(page + 10)
            setPage(page + 10);
        }
        setPrevY(y);
        console.log(y, prevY)
    }
    const getEvents = (page) => {
        setLoading(true);
        axios
            .get(
                `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?search=${query}&order_by=updated_at%20desc&limit=10&offset=${page}&pretty=false&timezone=UTC`
            )
            .then(res => {
                console.log({...res.data})
                setEvents((old)=> [...old,...res.data.records ])
                setLoading(false);
                setCount(res.data.total_count);
            });
    }
    return (
        <div className="container">
            <div style={{minHeight: "800px"}}>
                {events.map((event, i) => (
                    <Event key={i} infos={event.record.fields} eventID={event.record.id}/>
                ))}
            </div>

            <div
                ref={loadingRef}
                style={loadingCSS}>
                <span style={loadingTextCSS}>Loading...</span>
            </div>
        </div>
    )
}
export default EventsInfinite;