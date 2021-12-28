import React from 'react';
import { NavLink } from "react-router-dom";

export default function NavItem(props) {
    return (
        <NavLink
            to={props.to}
            className="btn btn-outline-dark my-2 d-flex align-items-center justify-content-center text-break"
            exact={props.exact ? true : undefined}
        >
            {props.name}
        </NavLink>
    )
}

export const NavItemButton = (props) => {
    return (
        <button
            disabled={props.disabled ? props.disabled : false}
            className="w-100 btn btn-outline-light my-2 d-flex align-items-center justify-content-center text-break"
            type={props.type ? props.type : "submit"}
            onClick={props.onClick ? props.onClick : null}
        >
            {props.name}
        </button>
    )
}
