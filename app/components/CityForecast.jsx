"use client";
import React from "react";
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { deleteCity } from "../features/cityList/cityListSlice";
import { fetchForecast } from "../features/cityList/cityListSlice";


function CityForecast({name, id, lat, lon}) {
  const dispatch = useDispatch();
  const router = useRouter();

  
  dispatch(
      fetchForecast({lat, lon})
    );
 ;
  


  const handleDeleteClick = (id) => {
    dispatch(
      deleteCity(id)
    );
    router.push('/');
  };

  return (
    <>
      <ul className='list-group list-group-horizontal text-center' >
        <li className='list-group-item col-3'>
          <h3>{name}</h3>
        </li>
        <li className='list-group-item col-3'>
          ID = {id} lat = {lat} lon = {lon}
        </li>
        <li className='list-group-item col-3'>
          <button onClick={() => handleDeleteClick(id)}>Delete City</button>
        </li>
        <li className='list-group-item col-3'>
          Humidity
        </li>
      </ul>
    </>
  )

}

export default CityForecast;
