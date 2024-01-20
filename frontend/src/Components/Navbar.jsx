import React, { useContext } from 'react'
import { BiSearchAlt } from "react-icons/bi";
import { Link, useParams } from 'react-router-dom';
import Context from "../Context/Context";
import { FaHome } from "react-icons/fa";

function Navbar() {

    const { name } = useParams();
    const { search, setSearch, filtering, setFiltering, handleSearch } = useContext(Context)

    return (
        <nav className='d-flex justify-content-between'>
            {name !== undefined ?
                <div className='d-flex justify-content-between'>
                    <Link style={{ textDecoration: "none", color: "black" }} to={`/${name}`}>
                        <button className='btn left_btn'>ADD TODOS</button>
                    </Link>
                    <Link style={{ textDecoration: "none", color: "black" }} to={`/${name}/todolist`}>
                        <button className='btn left_btn ms-3'>My List</button>
                    </Link>
                </div>
                : <strong>TODOS</strong>}
            {window.location.pathname === `/${name !== undefined ? name.replaceAll(" ", "%20") : null}/todolist` ? <div>
                <select value={filtering} onChange={(e) => { setFiltering(e.target.value) }}>
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                </select>
            </div> : ""}
            <form className='d-flex' onSubmit={handleSearch}>
                <input type="text" className='search' placeholder='Search' value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button type='submit' className='btn search_btn ms-3'><BiSearchAlt size={35} /></button>
                <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
                    <button type='submit' className='btn search_btn ms-3'><FaHome size={35} /></button>
                </Link>
            </form>
        </nav>
    )
}

export default Navbar