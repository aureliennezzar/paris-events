import React, {useEffect, useState} from "react";
import parse from 'html-react-parser';
import {useParams} from "react-router-dom/cjs/react-router-dom";
import {fetchApi, formatDate} from "../../utils/utils";
import "./SingleEvent.scss"

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
                <img className="principal-img" src={event.record.fields.cover.url} alt={event.record.fields.cover_alt}/>
                <h1>{event.record.fields.title}</h1>
                <div className="event-content">
                    <div className="desc">
                        {parse(event.record.fields.description)}
                    </div>
                    <div className="event-meta">
                        <h2>INFORMATIONS</h2>
                        <div className="date">{
                            event.record.fields.date_end
                                ? <><strong>Date : </strong>Du {formatDate(event.record.fields.date_start)} au {formatDate(event.record.fields.date_end)}
                                </>
                                : <><strong>Date : </strong>Débute le {formatDate(event.record.fields.date_start)}
                                </>
                        }</div>
                        {event.record.fields.price_detail && <p className="price">Prix : <strong>{event.record.fields.price_detail}</strong></p>}

                        <address className="address">
                            {event.record.fields.address_name}<br/>
                            {event.record.fields.address_street}<br/>
                            {event.record.fields.address_zipcode} {event.record.fields.address_city}
                        </address>

                        {event.record.fields.transport &&
                        <div className="transport"><strong>Comment nous rejoindre ?</strong> {event.record.fields.transport}
                        </div>}

                        <div className="contact-infos">
                            {event.record.fields.contact_phone && <p>Tél : <a
                                href={"tel:" + event.record.fields.contact_phone}>{event.record.fields.contact_phone}</a></p>}
                            {event.record.fields.contact_mail && <p>Mail : <a
                                href={"mailto:" + event.record.fields.contact_mail}>{event.record.fields.contact_mail}</a></p>}
                            {event.record.fields.contact_facebook && <p>Twitter : <a
                                href={event.record.fields.contact_facebook}>Cliquer ici</a></p>}
                            {event.record.fields.contact_twitter && <p>Facebook : <a
                                href={event.record.fields.contact_twitter}>Cliquer ici</a></p>}
                        </div>
                    </div>
                </div>
            </>}

            <p className="link" onClick={handleFav}>
                {isFav ? "Enlever des favoris" : "Ajouter aux favoris"}
            </p>
        </section>
    )
}
export default SingleEvent;