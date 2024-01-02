import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <NavLink to="info">Info</NavLink>
        <NavLink to="todos">Todos</NavLink>
        <NavLink to="posts">Posts</NavLink>
        <NavLink to="albums">Albums</NavLink>
        <NavLink to="/login">Logout</NavLink>
      </nav>
    </header>
  );
}

export default Header;
