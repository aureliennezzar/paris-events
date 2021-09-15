import React, {useEffect, useState} from "react";
import EventsList from "../../components/EventList/EventsList";
import "./Favorites.scss"

const Favorites = ()=>{
    const [favlist, setFavlist] = useState([]);
    useEffect(() => {
        try {
           JSON.parse(window.localStorage.getItem('favEvent')).forEach(event => {
                fetch(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${event}`)
                    .then(data => data.json())
                    .then(data => {
                        setFavlist((oldArr) => [...oldArr, data]);
                    })
            })
        } catch (error) {
            console.log(error,"error")
        }
    }, [])
    return (
        <section className="page page-favorites">
            <h1>Vos favoris</h1>
            <EventsList events={favlist}/>
        </section>
    )
}
export default Favorites;