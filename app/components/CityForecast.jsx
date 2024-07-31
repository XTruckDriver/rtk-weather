"use client";
import React from "react";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'
import { deleteCity } from "../features/cityList/cityListSlice";
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines";


function CityForecast({city}, index) { 

  const router = useRouter();
  const dispatch = useDispatch();

  const tempArray = city.weatherArrays.temp; 
  const pressureArray = city.weatherArrays.pressure;
  const humidityArray = city.weatherArrays.humidity;

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
          <h3>{city.name}</h3>
          <button onClick={() => handleDeleteClick(city.id)}>Delete City</button>
        </li>
        <li className='list-group-item col-3'>
          <Sparklines limit={40} width={200} height={100} data={tempArray} >
            <SparklinesLine />
            <SparklinesReferenceLine type="avg" />
          </Sparklines>
          <span>56 Degrees</span>
        </li>
        <li className='list-group-item col-3'>
          <Sparklines limit={40} width={200} height={100} data={pressureArray} >
            <SparklinesLine />
            <SparklinesReferenceLine type="avg" />
          </Sparklines>
        </li>
        <li className='list-group-item col-3'>
          <Sparklines limit={40} width={200} height={100} data={humidityArray} >
            <SparklinesLine />
            <SparklinesReferenceLine type="avg" />
          </Sparklines>
        </li>
      </ul>
    </>
  )

}

export default CityForecast;
