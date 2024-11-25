import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "d3";

const initialState = {
  isLoading: false,
  error: null,
  Productdata: null,
  getProductdata: null,
  currentPage: 0,
  limit: 6,
};


export const CreateProductData = createAsyncThunk(
  "product/create_product",
  async (fromData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(ProductStart());
      const response = await axios.post(
        `https://multi-vendor-project.vercel.app/api/product/create_product`,
        fromData
      );
      dispatch(ProductSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(ProductFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/get_Product",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(get_ProductStart());
      const token = localStorage.getItem('token'); 

      const response = await axios.get("https://multi-vendor-project.vercel.app/api/product/get_Product",
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        }
      );
      dispatch(get_ProductSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(get_ProductFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);



const BookSlice = createSlice({
  name: "Bookpage",
  initialState,
  reducers: {
    ProductStart(state) {
      state.isLoading = true;
    },
    ProductSuccess(state, action) {
      state.isLoading = false;
      state.Productdata = action.payload;
    },
    ProductFailure(state, action) {
      state.isLoading = false;
      state.Productdata = null;
      state.error = action.payload;
    },
    get_ProductStart(state) {
      state.isLoading = true;
    },
    get_ProductSuccess(state, action) {
      state.isLoading = false;
      state.getProductdata = action.payload?.data;
    },
    get_ProductFailure(state, action) {
      state.isLoading = false;
      state.getProductdata = null;
      state.error = action.payload;
    },

  },
});

export const {
  ProductStart,
  ProductSuccess,
  ProductFailure,
  get_ProductStart,
  get_ProductSuccess,
  get_ProductFailure,
} = BookSlice.actions;

export default BookSlice.reducer;
