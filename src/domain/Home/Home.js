import React, {useEffect, useState} from "react";
import Event from "../../components/Event/Event";
import "./Home.scss"
import bgImg from "../../assets/img/event.jpg"
import searchImg from "../../assets/img/loupe.svg"
import {useHistory} from "react-router-dom/cjs/react-router-dom";

const Home = () => {
    const [lastEvent, setLastEvent] = useState(null)
    const [query, setQuery] = useState("")
    const [input, setInput] = useState("")
    const history = useHistory()
    useEffect(() => {
        const API = "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-"
        fetch(`${API}/records?order_by=updated_at%20desc&limit=1&pretty=false&timezone=UTC`)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                setLastEvent(data.records[0].record)
            })
    }, [])

    const handleSubmit = (e) => {
        history.push("/rechercher/"+input)
    }
    return (
        <section className="page page-home">
            <div className="hero">
                <h1>Que faire à paris ?</h1>
                <img className="hero-bg" src={bgImg}/>
                <div className="hero-body">
                    <div className="last-event">
                        <h2>Dernier evenement</h2>
                        {lastEvent && <Event infos={lastEvent.fields} eventID={lastEvent.id}></Event>}
                    </div>
                    <form onSubmit={handleSubmit} className="search-form">
                        <input type="text" placeholder="Rechercher..." onInput={(e) => setInput(e.target.value)} value={input}/>
                        <button type="submit"><img src={searchImg}/></button>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Home;