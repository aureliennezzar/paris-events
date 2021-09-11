import React, {useEffect, useState} from "react";
import Event from "../../components/Event/Event";
import "./Home.scss"
import bgImg from "../../assets/img/event.jpg"

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
            <div className="hero">
                <h1>Que faire à paris ?</h1>
                <img src={bgImg}/>
            </div>
            <div className="last-event">
                <h2>Dernier evenement</h2>
                {lastEvent && <Event infos={lastEvent.fields} eventID={lastEvent.id}></Event>}
            </div>
        </section>
    )
}
export default Home;