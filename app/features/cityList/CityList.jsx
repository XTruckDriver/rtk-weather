"use client";
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { deleteCity } from "./cityListSlice";


const CityList = () => {
  const cities = useSelector((state) => state.cityList.cityList);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(cities);

  
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
      return cities.map((city) => {
        return (
          <li key={city.id}>
            <button onClick={() => handleDeleteClick(city.id)}>Delete City</button>
            {city.name}: {city.temp} Degrees
          </li>
        );
      });
    
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
