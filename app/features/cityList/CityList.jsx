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
      <ul className='list-group list-group-horizontal text-center' key={city.id}>
        <li className='list-group-item col-3'>
          {city.name}
        </li>
        <li className='list-group-item col-3'>
          Temperature
        </li>
        <li className='list-group-item col-3'>
          <button onClick={() => handleDeleteClick(city.id)}>Delete City</button>
        </li>
        <li className='list-group-item col-3'>
          Humidy
        </li>
      </ul>
      
        
    ));
    
  };


  return (
    <div className='container'>
      <div className='row text-center'>
        <div className='col-3'><strong>City</strong></div>
        <div className='col-3'><strong>Temperature (F)</strong></div>
        <div className='col-3'><strong>Pressure (hPa)</strong></div>
        <div className='col-3'><strong>Humidity (%)</strong></div>
      </div>
      {renderCities()}
      
    </div>
  );
};

export default CityList;
