import {Board, StateOfPlayers} from "../../../types/types";

interface GetTarget {
	target: StateOfPlayers["target"];
	boardToShots: Board;
}

export const getTarget = ({target, boardToShots}: GetTarget) =>
	boardToShots.map((col) => col.map((cell) => {
		if (cell.id === target) {
			return {...cell, cellState: "set"};
		} else {
			if (cell.cellState === "set") {
				return {...cell, cellState: null};
			} else {
				return {...cell};
			}
		}
	}));