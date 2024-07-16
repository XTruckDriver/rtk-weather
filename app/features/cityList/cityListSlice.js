import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 cityList: [
  { name: "Chicago", temp: 56, id: 84658893 },
  { name: "Denver", temp: 52, id: 66387769 },
  { name: "Nashville", temp: 65, id: 31339895 },
  ]
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
});

export const { addCity, deleteCity } = cityListSlice.actions;
export default cityListSlice.reducer;
