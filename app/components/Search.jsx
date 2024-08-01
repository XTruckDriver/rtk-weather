"use client";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { fetchGeoCodes } from "../features/cityList/cityListSlice";


const Search = () => {
  const [newSearch, setNewSearch] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      fetchGeoCodes(newSearch));

    setNewSearch("");
    
  };

  return (
    <>
    <div className="container m-4">
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
      </div>
    </>
  )

}

export default Search;
