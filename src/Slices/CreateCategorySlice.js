import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "d3";

const initialState = {
  isLoading: false,
  error: null,
  Categorydata: null,
  getCategorydata: null,
  currentPage: 0,
  limit: 6,
};


export const CreatecategoryData = createAsyncThunk(
  "category/create_category",
  async (fromData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(CategoryStart());
      const response = await axios.post(
        `https://multi-vendor-project.vercel.app/api/category/create_category`,
        fromData
      );
      dispatch(CategorySuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(CategoryFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const getCategory = createAsyncThunk(
  "category/getcategory",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(get_CategoryStart());
      const response = await axios.get("https://multi-vendor-project.vercel.app/api/category/getcategory");
      dispatch(get_CategorySuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(get_CategoryFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);



const BookSlice = createSlice({
  name: "Bookpage",
  initialState,
  reducers: {
    CategoryStart(state) {
      state.isLoading = true;
    },
    CategorySuccess(state, action) {
      state.isLoading = false;
      state.Categorydata = action.payload;
    },
    CategoryFailure(state, action) {
      state.isLoading = false;
      state.Categorydata = null;
      state.error = action.payload;
    },
    get_CategoryStart(state) {
      state.isLoading = true;
    },
    get_CategorySuccess(state, action) {
      state.isLoading = false;
      state.getCategorydata = action.payload?.findCategoryData;
    },
    get_CategoryFailure(state, action) {
      state.isLoading = false;
      state.getCategorydata = null;
      state.error = action.payload;
    },

  },
});

export const {
  CategoryStart,
  CategorySuccess,
  CategoryFailure,
  get_CategoryStart,
  get_CategorySuccess,
  get_CategoryFailure,
} = BookSlice.actions;

export default BookSlice.reducer;
