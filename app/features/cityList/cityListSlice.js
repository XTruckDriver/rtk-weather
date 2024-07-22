import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const APIkey = "dd9d476f3e18502da2edd15a3502cd8d";


const initialState = {
 cityList: [
  { name: "Chicago", id: 84658893 },
  { name: "Denver", id: 66387769 },
  { name: "Nashville", id: 31339895 },
  ],
  status: 'idle',
  error: null,
};

export const fetchGeoCodes = createAsyncThunk('cityList/fetchGeoCodes',
  async (city) => {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`);
    console.log(city, " geocode = ", response.data);
    return response.data;
  }

);

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
      });
  },
});

export const { addCity, deleteCity } = cityListSlice.actions;
export default cityListSlice.reducer;
