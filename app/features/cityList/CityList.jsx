"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import CityForecast from '@/app/components/CityForecast';
import { fetchForecast } from './cityListSlice';


const CityList = () => {
  const cities = useSelector((state) => state.cityList.cityList);
  const status = useSelector((state) => state.cityList.status);
  const error = useSelector((state) => state.cityList.error);
  const dispatch = useDispatch();


  useEffect(() => {
    
   

    cities.forEach((city, index) => {
      
        dispatch(fetchForecast({lat:city.lat, lon:city.lat, index}));
    
    });

  }, [cities.length, dispatch]);

  const renderCities = () => {

  }


  return (
    <div className='container mt-5'>
      <div className='row text-center pb-2'>
        <div className='col-3'><h5><>City</></h5></div>
        <div className='col-3'><h5><>Temperature (F)</></h5></div>
        <div className='col-3'><h5>Pressure (hPa)</h5></div>
        <div className='col-3'><h5><>Humidity (%)</></h5></div>
      </div> 
      
      {
        !Array.isArray(cities) || cities.length === 0 && (
          <p>No cities: Enter a city above to see forecast</p>
        )
      }
      {
        cities?.map((city, index) => (
  
          <CityForecast key={index} city={city} index={index} />

          ))
       }
      </div>
  );
};

export default CityList;
