import { NavLink } from "react-router-dom";
import { Nav } from "./styled.jsx";

export const Navigation = () => {
    return (
        <Nav>
            <ul>
                <li>
                    <NavLink to="/page1">Page 1</NavLink>
                </li>
                <li>
                    <NavLink to="/page2">Page 2</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
        </Nav>
    );
};
