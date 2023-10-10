import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    balance: 0,
    loan: 0,
    reason: "",
    isLoading: false,
};

const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers:{
        deposit(state, action){
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action){
            state.balance -= action.payload;
        },
        getLoan:{
            prepare(amount, reason){
                return{
                    payload:{
                        amount, reason
                    }
                }
            },
            reducer(state, action){
            if(state.loan > 0) return;
            
            state.loan = action.payload.amount;
            state.balance+=action.payload.amount;
            state.reason = action.payload.reason;
            
        }
    },
        payLoan(state){
            state.balance -= state.loan;
            state.loan = 0;
        },
        loading(state){
            state.isLoading = true;
        }

    }
});

export default accountSlice.reducer;
export const {withdraw, getLoan, payLoan} = accountSlice.actions;

export const deposit = (amount, currency)=>{
    if(currency === 'INR'){
        return {type: 'account/deposit', payload: amount
    }
    }
    else{
        return async function(dispatch, getState){
            dispatch({
                type: "account/loading" 
            });
            //api call
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`);

            const data = await res.json();
            // console.log(data);
            const convertedAmount = data.rates.INR;


             
            //return action 
            dispatch ({
                type: "account/deposit", payload: convertedAmount
            });
        }
    }
}
/*
export default function accountReducer(state = AccountInitialState, action){
    switch(action.type){
        case "account/deposit":
            return {...state, balance: state.balance + action.payload, isLoading: false };
        case "account/withdraw":
            return {...state, balance: state.balance - action.payload };
        case "account/getLoan":
            if(state.loan>0) return state; 
            return {...state, 
                balance: action.payload.amount + state.balance,
                loan: action.payload.amount, reason: action.payload.reason };
            
        case "account/payLoan":
            return {
                ...state, loan: 0, reason: "",
                balance: state.balance-state.loan,
            }
        case "account/loading":
            return{
                ...state, isLoading: true 
            }
        default: 
            return state;
    }

}
export const deposit = (amount, currency)=>{
    if(currency === 'USD'){
        return {type: 'account/deposit', payload: amount
    }
    }
    else{
        return async function(dispatch, getState){
            dispatch({
                type: "account/loading" 
            });
            //api call
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);

            const data = await res.json();
            // console.log(data);
            const convertedAmount = data.rates.USD;


             
            //return action 
            dispatch ({
                type: "account/deposit", payload: convertedAmount
            });
        }
    }
}
export const withdraw = (amount)=>{
    return {type: 'account/withdraw', payload: amount}
}
export const getLoan = (amount, reason)=>{
    return{
        type: 'account/getLoan', 
        payload:{
            amount, reason
        },
    }
}
export const payLoan = ()=>{
    return{
        type: 'account/payLoan'
    }
}
*/