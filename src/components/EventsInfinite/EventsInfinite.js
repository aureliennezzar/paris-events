import React, {Component} from "react";
import axios from "axios";
import Event from "../Event/Event";
import "../EventList/EventList.scss"
import loadImg from "../../assets/img/load.svg"

class EventsInfinite extends Component {
    constructor() {
        super();
        this.state = {
            events: [],
            count: 0,
            loading: false,
            page: 0,
            prevY: 0
        };
    }

    componentDidMount() {
        this.getEvents(this.state.page);

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.query !== this.props.query) {
            console.log("compo update")
            this.setState({...this.state, events: [], count: 0, page: 0});
            this.getEvents(0);
        }
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y && this.state.page <= this.state.count - 10) {
            this.getEvents(this.state.page + 10)
            this.setState({page: this.state.page + 10});
        }
        this.setState({prevY: y});
    }

    getEvents(page) {
        this.setState({loading: true});
        axios
            .get(
                `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?search=${this.props.query}&order_by=updated_at%20desc&limit=10&offset=${page}&pretty=false&timezone=UTC`
            )
            .then(res => {
                console.log({...res.data})
                this.setState({events: [...this.state.events, ...res.data.records], count: res.data.total_count});
                this.setState({loading: false});
            });
    }

    render() {

        // Additional css
        const loadingCSS = {
            height: "100px",
            margin: "30px",
            display: "flex",
            justifyContent: "center",
        };

        // To change the loading icon behavior
        const loadingTextCSS = {display: this.state.loading ? "block" : "none"};

        return (
            <>
                <div style={{minHeight: "800px"}} className="events-list">
                    <ul>
                        {this.state.events.map((event, i) => (
                            <li key={event.record.id}>
                                <Event infos={event.record.fields} eventID={event.record.id}/>
                            </li>
                        ))}
                    </ul>
                </div>

                <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}>
                    <span style={loadingTextCSS}><img src={loadImg}/></span>
                </div>
            </>
        );
    }
}

export default EventsInfinite;