import React, {useEffect, useState} from "react";
import parse from 'html-react-parser';
import {useParams} from "react-router-dom/cjs/react-router-dom";
import {fetchApi} from "../../utils/utils";

const SingleEvent = () => {
    const [event, setEvent] = useState(null);
    const [isFav, setIsFav] = useState(false)
    const storage = window.localStorage;
    let eventID = useParams().id
    useEffect(() => {
        fetchApi(setEvent, "/records/" + eventID)
    }, [])

    useEffect(() => {
        try {
            if (JSON.parse(storage.getItem('favEvent')).indexOf(eventID) >= 0) {
                setIsFav(true);
            }
        } catch (error) {
        }

    }, [])

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
        <section className="page page-event">
            {event && <>
                <h1>{event.record.fields.title}</h1>
                <img src={event.record.fields.cover.url} alt={event.record.fields.cover_alt}/>
                <div className="desc">
                    {parse(event.record.fields.description)}
                </div>
                <div className="date">{
                    event.record.fields.date_end
                        ? <> Du {event.record.fields.date_start}, au {event.record.fields.date_end}
                        </>
                        : <> Débute le {event.record.fields.date_start}
                        </>
                }</div>
                <p className="price">Prix : <strong>{event.record.fields.price_detail}</strong></p>
                <address>
                    {event.record.fields.address_name}<br/>
                    {event.record.fields.address_street}<br/>
                    {event.record.fields.address_zipcode} {event.record.fields.address_city}
                </address>
                {
                    event.record.fields.transport &&
                    <div className="transport"><strong>Comment nous rejoindre ?</strong> {event.record.fields.transport} </div>
                }
                <div className="contact-infos">
                    {event.record.fields.contact_phone && <>Tél : <a href={"tel:"+event.record.fields.contact_phone}>{event.record.fields.contact_phone}</a></>}
                    {event.record.fields.contact_mail && <>Mail : <a href={"mailto:"+event.record.fields.contact_mail}>{event.record.fields.contact_mail}</a></>}
                    {event.record.fields.contact_facebook && <>Twitter : <a href={event.record.fields.contact_facebook}>Cliquer ici</a></>}
                    {event.record.fields.contact_twitter && <>Facebook : <a href={event.record.fields.contact_twitter}>Cliquer ici</a></>}
                </div>
            </>}

            <button className="btn-fav" onClick={handleFav}>
                fav / {isFav ? "its fav" : "its not fav"}
            </button>
        </section>
    )
}
export default SingleEvent;