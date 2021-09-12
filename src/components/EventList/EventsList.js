import React, {useEffect, useState} from "react";
import "./EventList.scss"
import Event from "../Event/Event";

const EventsList = ({events}) => {
    useEffect(() => {
        console.log(events, "eventlist")
    }, [])

    return (
        <div className="events-list">
            <ul>
                {events && events.map((item, i) => (
                    <li>
                        <Event key={i} infos={item.record.fields} eventID={item.record.id}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EventsList;