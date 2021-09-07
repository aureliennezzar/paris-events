import React, {useEffect, useState} from "react";
import "./EventList.scss"
import Event from "../Event/Event";

const EventsList = ({events}) => {

    return (
        <div className="events-list">
            {/*{events.map(event => <Event infos={event.infos} eventID={event.eventID}/>)}*/}
        </div>
    )
}

export default EventsList;