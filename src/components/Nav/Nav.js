import React from "react"
import {Link, NavLink} from "react-router-dom";
import brand from "../../assets/img/brand.svg"
import "./Nav.scss"

const Nav = () => {
    return (
        <nav className="nav">
            <NavLink className="brand" to="/"><img src={brand}/></NavLink>
            <ul>
                <li>
                    <NavLink to="/rechercher">Rechercher</NavLink>
                </li>
                <li>
                    <NavLink to="/favoris">Vos favoris</NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Nav;