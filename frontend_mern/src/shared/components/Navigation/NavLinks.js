import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>USUÁRIOS</NavLink>
      </li>
      <li>
        <NavLink to='/u1/places'>LUGARES</NavLink>
      </li>
      <li>
        <NavLink to='/places/new'>ADD LUGAR</NavLink>
      </li>
      <li>
        <NavLink to='/auth'>LOGAR</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
