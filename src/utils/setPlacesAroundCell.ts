import {coordinatesAround} from "./coordinates";
import {Board, Cell} from "../types/types";

export const setPlacesAroundCell = <K extends keyof Cell>(board: Board, cell: Cell, valueName: K, value: Cell[K]): Board =>
	board.map((col) => col.map((row) =>
		coordinatesAround.some((coordinate) =>
			(row.col.number === cell.col.number + coordinate[0]) &&
			(row.row.number === cell.row.number + coordinate[1])
		) && row.cell !== "ship"
			?
			{...row, [valueName]: value}
			:
			{...row}
	));