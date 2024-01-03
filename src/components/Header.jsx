import {React, useState} from "react";
import { NavLink } from "react-router-dom";
import Info from "./Info";
function Header() {

  const [isShowInfo, setIsShowInfo] = useState(false);
  return (

    <header>
      <nav>
        <button onClick={() => setIsShowInfo(prev => !prev)}>Info</button>
        <NavLink to="todos">Todos</NavLink>
        <NavLink to="posts">Posts</NavLink>
        <NavLink to="albums">Albums</NavLink>
        <NavLink to="/login" onClick={() => localStorage.removeItem("currentUser")}>Logout</NavLink>
        <NavLink to=".">🏠</NavLink>
      </nav>
      {isShowInfo && <Info/>}
    </header>
  );
}

export default Header;
