import {createSlice} from "@reduxjs/toolkit";
import {boardSchemat} from "./Play/boardSchemat.jsx";

const playSlice = createSlice({
	name: "play",
	initialState: {
		board: boardSchemat(),
	},
	reducers: {
		setBoard: (state, {payload: board}) => {
			state.board = board;
		},
		setCounter: (state, {payload: amount}) => {
			state.counter = amount;
		},
		resetCounter: (state) => {
			state.counter = 0;
			state.description = "ready";
		},
		setDescription: (state, {payload: description}) => {
			state.description = description;
		},
	},
});

export const {
	setBoard,
	setCounter,
	resetCounter,
	setDescription
}
	= playSlice.actions;

const selectPlayState = (state) => state.play;
export const selectBoard = (state) => selectPlayState(state).board;
export const selectColumns = (state) =>
	selectBoard(state).columns;
export const selectRows = (state) =>
	selectColumns(state).rows;
export const selectCell = (state) =>
	selectRows(state).cell;

export default playSlice.reducer;
