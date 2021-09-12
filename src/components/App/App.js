import {Redirect, Route, Switch} from "react-router-dom";
import Favorites from "../../domain/Favorites/Favorites";
import SingleEvent from "../../domain/SingleEvent/SingleEvent";
import Home from "../../domain/Home/Home";
import Search from "../../domain/Search/Search";
import Nav from "../Nav/Nav";

function App() {
    return (
        <div className="App">
            <Nav />
            <Switch>
                <Route exact path="/" component={() => <Redirect to='/accueil' />} />
                <Route exact path="/accueil" component={() => <Home></Home>}></Route>
                <Route exact path="/rechercher/:query" component={() => <Search></Search>}></Route>
                <Route exact path="/favoris" component={() => <Favorites></Favorites>}></Route>
                <Route exact path="/evenement/:id" component={() => <SingleEvent></SingleEvent>}></Route>
            </Switch>
        </div>
    );
}

export default App;
