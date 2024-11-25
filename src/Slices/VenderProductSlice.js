import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "d3";

const initialState = {
  isLoading: false,
  error: null,
  Productdata: null,
  getVendorProductdata: null,
  currentPage: 0,
  limit: 6,
};


export const CreateProductData = createAsyncThunk(
  "vendor/createVenderProduct",
  async (fromData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(venderProductStart());
      const response = await axios.post(
        `https://multi-vendor-project.vercel.app/api/vendor/createVenderProduct`,
        fromData
      );
      dispatch(venderProductSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(venderProductFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const getVendorProduct = createAsyncThunk(
  "vendor/getVendorProduct",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(get_venderProductStart());
      const response = await axios.get("https://multi-vendor-project.vercel.app/api/vendor/getVendorProduct");
      dispatch(get_venderProductSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(get_venderProductFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);



const BookSlice = createSlice({
  name: "Bookpage",
  initialState,
  reducers: {
    venderProductStart(state) {
      state.isLoading = true;
    },
    venderProductSuccess(state, action) {
      state.isLoading = false;
      state.Productdata = action.payload;
    },
    venderProductFailure(state, action) {
      state.isLoading = false;
      state.Productdata = null;
      state.error = action.payload;
    },
    get_venderProductStart(state) {
      state.isLoading = true;
    },
    get_venderProductSuccess(state, action) {
      state.isLoading = false;
      state.getVendorProductdata = action.payload?.data;
    },
    get_venderProductFailure(state, action) {
      state.isLoading = false;
      state.getVendorProductdata = null;
      state.error = action.payload;
    },

  },
});

export const {
  venderProductStart,
  venderProductSuccess,
  venderProductFailure,
  get_venderProductStart,
  get_venderProductSuccess,
  get_venderProductFailure,
} = BookSlice.actions;

export default BookSlice.reducer;
