import {randomMinMax} from "./randomMinMax.jsx";
import {getFleet} from "./getFleet.jsx";

export const buildShips = (board) => {
	let newBoard = board.map(row => row.map(cell => ({...cell})));

	const fleet = getFleet();
	fleet.map((ship) => {
		const shipSize = ship.length;
		let placeForShip = 0;

		while (placeForShip < shipSize) {
			placeForShip = 0;

			const colRandom = randomMinMax(1, 10);
			const rowRandom = randomMinMax(1, 10);
			let newShip = [];
			ship.map((shipItem) => {
				const newItem = {col: colRandom + shipItem.y, row: rowRandom + shipItem.x}
				newShip = [...newShip, newItem]
			})

			let tempBoard = newBoard
			newShip.forEach((newShipItem) => {

				const boardWithItems = tempBoard.map((col) => col.map((cell) => {
					if (cell.col.number === newShipItem.col && cell.row.number === newShipItem.row && cell.cell === "empty") {
						placeForShip = ++placeForShip
						return {...cell, cell: "ship"};
					} else {
						return cell;
					}
				}));

				tempBoard = [...boardWithItems]

				if ((placeForShip === shipSize)) {
					tempBoard.forEach((col) => col.forEach((cell) => {
						if (cell.cell === "ship") {
							const boardWithReserved = tempBoard.map((col_) => col_.map((row_) => {
									if (
										((row_.col.number === cell.col.number + 1 &&
												(row_.row.number === cell.row.number)
											) ||
											(row_.col.number === cell.col.number &&
												(row_.row.number === cell.row.number + 1)
											) ||
											(row_.col.number === cell.col.number - 1 &&
												(row_.row.number === cell.row.number)
											) ||
											(row_.col.number === cell.col.number &&
												(row_.row.number === cell.row.number - 1)
											) ||
											(row_.col.number === cell.col.number + 1 &&
												(row_.row.number === cell.row.number + 1)
											) ||
											(row_.col.number === cell.col.number - 1 &&
												(row_.row.number === cell.row.number - 1)
											) ||
											(row_.col.number === cell.col.number - 1 &&
												(row_.row.number === cell.row.number + 1)
											) ||
											(row_.col.number === cell.col.number + 1) &&
											(row_.row.number === cell.row.number - 1)) &&
										row_.cell === "empty") {
										return {...row_, cell: "reserved"}
									} else {
										return row_
									}
								}
							))
							tempBoard = [...boardWithReserved];
							newBoard = [...boardWithReserved]
						}
					}));
				}
			});
		}
	})

	return newBoard;
};