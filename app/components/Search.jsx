"use client";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addCity } from "../features/cityList/cityListSlice";


const Search = () => {
  const [newSearch, setNewSearch] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("add new city to list");
    dispatch(
      addCity({
        name: newSearch,
        id: Math.floor(Math.random() * 90000000) + 10000000,
      })
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Enter City: 
          <input
            type="text"
            value={newSearch}
            onChange={(e) => setNewSearch(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </>
  )

}

export default Search;
