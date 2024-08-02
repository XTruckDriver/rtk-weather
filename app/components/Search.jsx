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
    <div className="d-flex justify-content-center mt-5 col-md-12">
      <form onSubmit={handleSubmit} className="d-flex">
        <input
            className="form-control me-2"
            type="text"
            placeholder="Enter City Name"
            value={newSearch}
            onChange={(e) => setNewSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </>
  )

}

export default Search;
