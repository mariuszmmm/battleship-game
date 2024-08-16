import { createSlice } from "@reduxjs/toolkit";

const exampleSlice = createSlice({
    name: "example",
    initialState: {
        counter: 0,
        description: "ready",
    },
    reducers: {
        setCounter: (state, { payload: amount }) => {
            state.counter = amount;
        },
        resetCounter: (state) => {
            state.counter = 0;
            state.description = "ready";
        },
        setDescription: (state, { payload: description }) => {
            state.description = description;
        },
    },
});

export const { setCounter, resetCounter, setDescription } =
    exampleSlice.actions;

const selectExampleState = (state) => state.example;
export const selectCounter = (state) => selectExampleState(state).counter;
export const selectDescription = (state) =>
    selectExampleState(state).description;

export default exampleSlice.reducer;
