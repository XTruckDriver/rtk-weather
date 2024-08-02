"use client";
import React from "react";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'
import { deleteCity } from "../features/cityList/cityListSlice";
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines";


function CityForecast({city}) { 

  const router = useRouter();
  const dispatch = useDispatch();

  const tempArray = city.weatherArrays.temp;
  const pressureArray = city.weatherArrays.pressure;
  const humidityArray = city.weatherArrays.humidity;
  const cityName = (city.name).charAt(0).toUpperCase() + (city.name).slice(1);

  const computeAverage = (array) => {
    if(!Array.isArray(array) || array.length === 0) {
      console.error("Error with array");
      return 0;
    }

    let sum = array.reduce((a, b) => a + b, 0);
    let avg = (sum / array.length);
    return Math.round(avg);
  };

  const handleDeleteClick = (id) => {
    dispatch(
      deleteCity(id)
    );
    router.push('/');
  };

  return (
    <>
      <ul className='list-group list-group-horizontal text-center' >
        <li className='list-group-item col-3 p-5'>
          <h3>{cityName}</h3>
          <button onClick={() => handleDeleteClick(city.id)} className="btn btn-danger">Delete</button>
        </li>
        <li className='list-group-item col-3'>
          <Sparklines limit={40} width={200} height={100} data={tempArray} >
            <SparklinesLine color="#40c0f5" />
            <SparklinesReferenceLine type="avg" />
          </Sparklines>
          <span>{computeAverage(tempArray)} F</span>
        </li>
        <li className='list-group-item col-3'>
          <Sparklines limit={40} width={200} height={100} data={pressureArray} >
            <SparklinesLine color="#d1192e" />
            <SparklinesReferenceLine type="avg" />
          </Sparklines>
          <span>{computeAverage(pressureArray)} hPa</span>
        </li>
        <li className='list-group-item col-3'>
          <Sparklines limit={40} width={200} height={100} data={humidityArray} >
            <SparklinesLine color="#8ed53f" />
            <SparklinesReferenceLine type="avg" />
          </Sparklines>
          <span>{computeAverage(humidityArray)}%</span>
        </li>
      </ul>
    </>
  )

}

export default CityForecast;
