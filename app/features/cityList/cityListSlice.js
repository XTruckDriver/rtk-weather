import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const APIkey = "dd9d476f3e18502da2edd15a3502cd8d";
 

export const fetchGeoCodes = createAsyncThunk('newCity/fetchGeoCodes', async (city, { dispatch }) => {
  const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`);

  const newCity = {
    name: city,
    id: Math.floor(Math.random() * 90000000) + 10000000,
    lat: response.data[0].lat,
    lon: response.data[0].lon,
    weatherArrays: {},
  };

  dispatch(
    addCity(newCity)
  );
 
} );

export const fetchForecast = createAsyncThunk('city/fetchForecast', async ({lat, lon, index}) => {

  const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`);

  let humidityArray = [];
  let tempArray = [];
  let pressureArray = [];

  for (let i = 0; i < 40; i++) {
    humidityArray[i] = response.data.list[i].main.humidity;
    tempArray[i] = Math.round(response.data.list[i].main.temp);
    pressureArray[i] = response.data.list[i].main.pressure;
  };

  const forecastArrays = {
    temp: tempArray,
    pressure: pressureArray,
    humidity: humidityArray
  };

  return {index , arrays: forecastArrays};

} );

const initialState = {
 cityList: [
  { 
    name: "Chicago",
    id: 84658893,
    lat: 41.8755616,
    lon: -87.6244212,
    weatherArrays: [],
  },
  {
    name: "Denver",
    id: 66387769,
    lat: 39.7392364,
    lon: -104.984862,
    weatherArrays: [],
  },
  {
    name: "Nashville",
    id: 31339895,
    lat: 36.1622767,
    lon: -86.7742984,
    weatherArrays: [],
  },
  ],
  
  status: 'idle',
  error: null,
};


export const cityListSlice = createSlice({
  name: "cityList",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.cityList.push(action.payload);
    },
    deleteCity: (state, action) => {
      state.cityList = state.cityList.filter(city => city.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeoCodes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGeoCodes.fulfilled, (state, action) => {
        state.status = 'succeeded';

      })
      .addCase(fetchGeoCodes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchForecast.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { index , arrays} = action.payload;
        const cityToUpdate = state.cityList[index];
        if (cityToUpdate) {
          cityToUpdate.weatherArrays = arrays
        }
        
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addCity, deleteCity } = cityListSlice.actions;
export default cityListSlice.reducer;