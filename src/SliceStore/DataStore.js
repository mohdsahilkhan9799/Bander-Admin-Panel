import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '../Slices/AdminSlice.js';
import categoryproduceReducer from "../Slices/CreateCategorySlice.js"
import CreateproduceReducer from "../Slices/CreateProductSlice.js"
import CreatcoupansReducer from "../Slices/CoupanSlice.js"
import VendorReducer from "../Slices/VenderProductSlice.js"



export default configureStore({
  reducer: {
    admin: adminReducer,
    Category: categoryproduceReducer,
    Product: CreateproduceReducer,
    Coupans: CreatcoupansReducer,
    Vendor: VendorReducer,
  }
})