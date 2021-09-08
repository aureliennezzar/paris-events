import React, {useEffect, useState} from "react";
import "./EventList.scss"
import Event from "../Event/Event";

const EventsList = ({events}) => {

    return (
        <div className="events-list">
            {events && events.map((item,i) => <Event key={i} infos={item.record.fields} eventID={item.record.id}/>
            )}
        </div>
    )
}

export default EventsList;