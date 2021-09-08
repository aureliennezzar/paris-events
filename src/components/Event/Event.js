import React, {useEffect, useState} from "react";
import "./Event.scss"
import {useHistory} from "react-router-dom/cjs/react-router-dom";

const Event = ({infos, eventID}) => {
    const [isFav, setIsFav] = useState(false)
    const history = useHistory()
    const storage = window.localStorage;
    const {cover, cover_alt, title, date_start, lead_text} = infos


    useEffect(() => {
        try {
            if (JSON.parse(storage.getItem('favEvent')).indexOf(eventID) >= 0) {
                setIsFav(true);
            }
        } catch (error) {
        }

    }, [])

    const ChangePath = (path)=>{
        history.push(path)
    }
    const handleFav = () => {
        if (isFav) {
            const result = JSON.parse(storage.getItem('favEvent')).filter(event => event !== eventID);
            storage.setItem("favEvent", JSON.stringify(result))
            setIsFav(false);
        } else {
            try {
                storage.setItem("favEvent", JSON.stringify([...JSON.parse(storage.getItem('favEvent')), eventID]))
            } catch (error) {
                storage.setItem("favEvent", JSON.stringify([eventID]))
            }
            setIsFav(true);
        }
    }

    return (
        <article className={`event ${isFav ? "is-fav" : ""}`} onClick={()=>{
            ChangePath("evenement/"+eventID);
        }}>
            <div className="top">
                <img src={cover.url} alt={cover_alt}/>
            </div>
            <div className="bottom">
                <h3 className="title">{title}</h3>
                <p className="date">{date_start}</p>
                <p className="desc">{lead_text}</p>
            </div>
            <button className="btn-fav" onClick={handleFav}>
                fav
            </button>
        </article>
    )
}

export default Event;