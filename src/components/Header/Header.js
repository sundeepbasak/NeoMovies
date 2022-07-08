import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import userImage from "../../images/user-1.png";
import "./Header.scss";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(term);

    if (searchText === "") return alert("Please enter a search term!!");
    dispatch(fetchAsyncMovies(searchText));
    dispatch(fetchAsyncShows(searchText));
    setSearchText("");
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">NeoMovies</Link>
      </div>

      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={searchText}
            placeholder="Search Movies or Shows"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit">
            <i className="fa-solid fa-search"></i>
          </button>
        </form>
      </div>

      <div className="user-image">
        <img src={userImage} alt="user" />
      </div>
    </div>
  );
};

export default Header;
