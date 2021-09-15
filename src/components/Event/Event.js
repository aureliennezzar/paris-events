import React, {useEffect, useState} from "react";
import "./Event.scss"
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {formatDate} from "../../utils/utils";

const Event = ({infos, eventID}) => {
    const [isFav, setIsFav] = useState(false)
    const history = useHistory()
    const storage = window.localStorage;
    const {cover, cover_alt, title, date_start, lead_text, price_type} = infos


    useEffect(() => {
        try {
            if (JSON.parse(storage.getItem('favEvent')).indexOf(eventID) >= 0) {
                setIsFav(true);
            }
        } catch (error) {
        }

    }, [])

    const ChangePath = (path)=>{
        history.push("/"+path)
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
        <article className={`event ${isFav ? "is-fav" : ""}`} >
            <div className="top">
                <img src={cover.url} alt={cover_alt}/>
            </div>
            <div className="body">
                <div className="bottom">
                    <div className="bottom-hero">
                        <p className="date">{formatDate(date_start)}</p>
                        <p className={`price ${price_type === "payant"?"paying":"free"}`}>{price_type}</p>
                    </div>
                    <h3 className="title">{title}</h3>
                    <p className="desc">{lead_text}</p>
                </div>
                <div className="event-footer">
                    <p className="link" onClick={()=>{
                        ChangePath("evenement/"+eventID);
                    }}>Voir l'évenement</p>
                    <p className="link" onClick={handleFav}>
                        {isFav ? "Enlever des favoris" : "Ajouter aux favoris"}
                    </p>
                </div>
            </div>
        </article>
    )
}

export default Event;