import accountReducer from "./components/accounts/accountSlice";
import customerReducer from "./components/customers/customerSlice";
import { configureStore } from "@reduxjs/toolkit";
const store =  configureStore({
    reducer:{
        account: accountReducer,
        customer: customerReducer,
    }
});

export default store;