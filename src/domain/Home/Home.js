import React, {useEffect, useState} from "react";
import {fetchApi} from "../../utils/utils";
import Event from "../../components/Event/Event";

const Home = () => {
    const [lastEvent, setLastEvent] = useState(null)
    useEffect(() => {
        const API = "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-"
        fetch(`${API}/records?order_by=updated_at%20desc&limit=1&pretty=false&timezone=UTC`)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                setLastEvent(data.records[0].record)
            })
    }, [])
    return (
        <section className="page page-home">
            <h1>Bienvenue sur paris event</h1>
            {lastEvent && <Event infos={lastEvent.fields} eventID={lastEvent.id}></Event>}
        </section>
    )
}
export default Home;