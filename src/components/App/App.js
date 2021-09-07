import {Redirect, Route, Switch} from "react-router-dom";
import Favorites from "../../domain/Favorites/Favorites";
import SingleEvent from "../../domain/SingleEvent/SingleEvents";
import Home from "../../domain/Home/Home";
import Search from "../../domain/Search/Search";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={() => <Redirect to='/accueil' />} />
                <Route path="/accueil" component={() => <Home></Home>}></Route>
                <Route path="/rechercher" component={() => <Search></Search>}></Route>
                <Route path="/favoris" component={() => <Favorites></Favorites>}></Route>
                <Route path="/evenement" component={() => <SingleEvent></SingleEvent>}></Route>
            </Switch>
        </div>
    );
}

export default App;
