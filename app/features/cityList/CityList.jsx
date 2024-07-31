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


  return (
    <div className='container'>
      <div className='row text-center'>
        <div className='col-3'><strong>City</strong></div>
        <div className='col-3'><strong>Temperature (F)</strong></div>
        <div className='col-3'><strong>Pressure (hPa)</strong></div>
        <div className='col-3'><strong>Humidity (%)</strong></div>
      </div> 
      {
        cities.map((city, index) => (
  
          <CityForecast key={index} city={city} index={index} />

          ))
       }
      </div>
  );
};

export default CityList;
