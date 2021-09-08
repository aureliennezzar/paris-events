import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import {fetchApi} from "../../utils/utils";

const SingleEvent = () => {
    const [event, setEvent] = useState(null);
    const { cover,  } = event.fields
    let eventID = useParams().id
    useEffect(()=>{
        fetchApi(setEvent, "/records/" + eventID)
        console.log(event)
    },[])
    return (
        <section className="page page-event">

        </section>
    )
}
export default SingleEvent;