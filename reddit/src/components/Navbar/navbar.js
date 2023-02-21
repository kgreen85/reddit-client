import React, { useState } from "react";
import "./navbar.css";
import { FaReddit } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import {setSearchTerm} from "../../store/homeSlice"

function Navbar() {
  const [searchTermLocal, setSearchTermLocal] = useState("");
  const dispatch = useDispatch();

  const onSearchTermChange = (e) => {
    setSearchTermLocal(e.target.value);
  };

  const onSearchTermSubbmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTermLocal))
  }

  return (
    <header>
      <div className="logo">
        <FaReddit className="logo-icon" />
        <p>
          Reddit<span>Minimal</span>
        </p>
      </div>
      <form className="search" onSubmit={onSearchTermSubbmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchTermLocal}
          onChange={onSearchTermChange}
          aria-label="Search posts"
        />
        <button type="submit"  aria-label="Search">
          <HiOutlineSearch />
        </button>
      </form>
    </header>
  );
}

export default Navbar;
