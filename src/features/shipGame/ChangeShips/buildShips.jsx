import {randomMinMax} from "../../../utils/randomMinMax.jsx";
import {rotateShip} from "./rotateShip.jsx";
import {itemNextToNeighbor} from "./itemNextToNeighbor.jsx";
import {setPlacesReserved} from "./functionsCellActions.jsx";

export const buildShips = ({board, parameters, fleet}) => {
	let newBoard = board.map(row => row.map(cell => ({...cell})));
	const {mayTouch} = parameters;
	fleet.forEach((ship, index) => {
			const numberOfShipElements = ship.length;
			let placeForShip = 0;
			let newShip = [];

			while (placeForShip < numberOfShipElements) {
				placeForShip = 0;
				newShip = [];
				const colRandom = randomMinMax(0, 9);
				const rowRandom = randomMinMax(0, 9);
				const shipRandomRotated = rotateShip(ship, randomMinMax(0, 3));
				shipRandomRotated.forEach((shipItem) => {
					const newItem = {
						place: {
							col: colRandom + shipItem.y,
							row: rowRandom + shipItem.x,
						},
						numberOfShip: index + 1,
						selected: false
					}
					newShip = [...newShip, newItem];
				});

				const newShipWithInfo = itemNextToNeighbor(newShip);
				newShip = [...newShipWithInfo];

				let tempBoard = [...newBoard];
				newShip.forEach((newShipItem) => {
					const boardWithItems = tempBoard.map((col) => col.map((cell) => {
						if (
							cell.col.number === newShipItem.place.col &&
							cell.row.number === newShipItem.place.row &&
							cell.cell === "empty"
						) {
							placeForShip = ++placeForShip

							return {
								ship: {...newShipItem},
								...cell,
								cell: "ship",
							};
						} else {
							return {...cell};
						}
					}));
					tempBoard = [...boardWithItems]

					if ((placeForShip === numberOfShipElements)) {
						if (mayTouch) {
							newBoard = [...tempBoard]
						} else {
							tempBoard.forEach((col) => col.forEach((cell) => {
								if (cell.cell === "ship") {
									const boardWithReserved = setPlacesReserved(tempBoard, cell, "reserved");
									tempBoard = [...boardWithReserved]
									newBoard = [...boardWithReserved]
								}
							}))
						}
					}
				});
			}


		}	)

	const clearEmptyOnBoard = newBoard.map((col) => col.map((cell) => {
		if (cell.cell === "ship") {
			return {...cell}
		} else {
			return {...cell, cell: "empty"}
		}
	}))
	newBoard = [...clearEmptyOnBoard];



	return newBoard;
};