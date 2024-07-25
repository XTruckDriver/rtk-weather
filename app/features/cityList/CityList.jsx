"use client";
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import CityForecast from '@/app/components/CityForecast';


const CityList = () => {
  const cities = useSelector((state) => state.cityList.cityList);
  const status = useSelector((state) => state.cityList.status);
  const error = useSelector((state) => state.cityList.error);

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
          <CityForecast key={index} name={city.name} id={city.id} lat={city.lat} lon={city.lon}/>
          ))
       }
      </div>
  );
};

export default CityList;
