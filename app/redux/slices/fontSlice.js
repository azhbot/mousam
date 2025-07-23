import { createSlice } from "@reduxjs/toolkit";

const initialState={
    font:"poppins"
}

const fontSlice=createSlice({
    name:"font",
    initialState,
    reducers:{
        setFont:(state,action)=>{
            state.font=action.payload
        },
        resetFont: (state) => {
            state.font = "poppins";
        }
    }
})
export const {setFont}=fontSlice.actions;
export default fontSlice.reducer;
