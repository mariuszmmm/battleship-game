export const getFleet = (board) => {
	let fleet = [];

	board.forEach((col) => col.forEach((cell) => {
		if (cell.cell === "ship") {
			fleet = [...fleet, cell];
		}
	}))

	return fleet;
};