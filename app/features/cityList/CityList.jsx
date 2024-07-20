"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { deleteCity, fetchGeoCodes } from "./cityListSlice";


const CityList = () => {
  const cities = useSelector((state) => state.cityList.cityList);
  const status = useSelector((state) => state.cityList.status);
  const error = useSelector((state) => state.cityList.error);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(cities);

  useEffect(() => {
    cities.forEach(city => {
      console.log("fetchGeoCodes for : ",city.name);
      dispatch(fetchGeoCodes(city.name));
    });
  }, [cities, dispatch]);

  
  const handleDeleteClick = (id) => {
    console.log("delete button clicked: id = ", id);
    dispatch(
      deleteCity(id)
    );
    router.push('/');
  };


  const renderCities = () => {
    if (!Array.isArray(cities) || cities.length === 0) {
      return <p>No cities available.</p>;
    }

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (status === 'failed') {
      return <p>Error: {error}</p>;
    }

    return cities.map((city) => (
      <li key={city.id}>
            <button onClick={() => handleDeleteClick(city.id)}>Delete City</button>
            {city.name}: {city.temp} Degrees
          </li>
        
    ));
    
  };


  return (
    <>
      <h2> List of Cities </h2>
      <ul>
        {renderCities()}
      </ul>
    </>
  );
};

export default CityList;
