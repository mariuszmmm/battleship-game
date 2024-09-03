const coordinatesAroundCell = [
	[-1, 1], [0, 1], [1, 1],
	[-1, 0], [1, 0],
	[-1, -1], [0, -1], [1, -1]
];

export const setPlacesReserved = (tempBoard, cell, value) => {
	// console.log(tempBoard, cell)
	return tempBoard.map((col) => col.map((row) => (
			coordinatesAroundCell.some((coordinate) =>
				(row.col.number === cell.col.number + coordinate[0]) &&
				(row.row.number === cell.row.number + coordinate[1])
			) && row.cell !== "ship"
				?
				{...row, cell: value}
				:
				{...row}
		)
	))
};

export const warningsAroundCell = (allShip, tempBoard) => {
	let warningsForShipNumbers = [];

	allShip.forEach((ship) => {
		// console.log(ship)
		tempBoard.forEach((col) => col.forEach((cell) => {
			// console.log(ship,cell)
			if (coordinatesAroundCell.some((coordinate) =>
				(ship.place.col === cell.col.number + coordinate[0]) &&
				(ship.place.row === cell.row.number + coordinate[1]) &&
				cell.cell === "ship" &&
				(ship.numberOfShip !== cell.ship.numberOfShip)
			)) {
				console.log(ship,cell)
				if (!warningsForShipNumbers.includes(ship.numberOfShip)) {

					warningsForShipNumbers = [...warningsForShipNumbers, ship.numberOfShip];
					console.log(warningsForShipNumbers)
					console.log(!warningsForShipNumbers.includes(ship.numberOfShip))
				}
			}
		}))
	})
// console.log(warningsForShipNumbers)
	return warningsForShipNumbers;
};
