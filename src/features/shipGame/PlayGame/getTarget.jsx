export const getTarget = ({target, boardToShots}) => {
	return boardToShots.map((col) => col.map((cell) => {
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
};
