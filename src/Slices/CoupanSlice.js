import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "d3";

const initialState = {
  isLoading: false,
  error: null,
  Coupansdata: null,
  getCoupansdata: null,
  currentPage: 0,
  limit: 6,
};


export const CreateCoupansData = createAsyncThunk(
  "coupans/create_Coupans",
  async (fromData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(CoupansStart());
      const response = await axios.post(
        `https://multi-vendor-project.vercel.app/api/coupans/create_Coupans`,
        fromData
      );
      dispatch(CoupansSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(CoupansFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const getCoupans = createAsyncThunk(
  "coupans/get_Coupans",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(get_CoupansStart());
      const response = await axios.get("https://multi-vendor-project.vercel.app/api/coupans/get_Coupanss");
      dispatch(get_CoupansSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(get_CoupansFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);



const BookSlice = createSlice({
  name: "Bookpage",
  initialState,
  reducers: {
    CoupansStart(state) {
      state.isLoading = true;
    },
    CoupansSuccess(state, action) {
      state.isLoading = false;
      state.Coupansdata = action.payload;
    },
    CoupansFailure(state, action) {
      state.isLoading = false;
      state.Coupansdata = null;
      state.error = action.payload;
    },
    get_CoupansStart(state) {
      state.isLoading = true;
    },
    get_CoupansSuccess(state, action) {
      state.isLoading = false;
      state.getCoupansdata = action.payload?.data
      ;
    },
    get_CoupansFailure(state, action) {
      state.isLoading = false;
      state.getCoupansdata = null;
      state.error = action.payload;
    },

  },
});

export const {
  CoupansStart,
  CoupansSuccess,
  CoupansFailure,
  get_CoupansStart,
  get_CoupansSuccess,
  get_CoupansFailure,
} = BookSlice.actions;

export default BookSlice.reducer;
