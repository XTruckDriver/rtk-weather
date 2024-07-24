"use client";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addCity } from "../features/cityList/cityListSlice";
import { fetchGeoCodes } from "../features/cityList/cityListSlice";


const Search = () => {
  const [newSearch, setNewSearch] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("add new city to list");
    dispatch(
      fetchGeoCodes(newSearch));
    
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
