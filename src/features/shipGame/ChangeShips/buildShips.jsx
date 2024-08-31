import {randomMinMax} from "../../../utils/randomMinMax.jsx";
import {rotateShip} from "./rotateShip.jsx";
import {addInfoAboutNeighborToShip} from "./addInfoAboutNeighborToShip.jsx";
import {addReservedPlaceToBoard} from "./addReservedPlaceToBoard.jsx";

export const buildShips = ({board, parameters, fleet}) => {
	let newBoard = board.map(row => row.map(cell => ({...cell})));
	const {mayTouch} = parameters;
	let fleetOnBoard = [];
	fleet.forEach((ship, index) => {
			const numberOfShipElements = ship.length;
			let placeForShip = 0;
			let newShip = [];

			while (placeForShip < numberOfShipElements) {
				placeForShip = 0;
				newShip = [];
				const colRandom = randomMinMax(0, 9);  //0, 9
				const rowRandom = randomMinMax(0, 9); //0, 9
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

				const newShipWithInfo = addInfoAboutNeighborToShip(newShip);
				newShip = [...newShipWithInfo];

				let tempBoard = [...newBoard];
				let tempFleetOnBoard = [];
				newShip.forEach((newShipItem) => {
					const boardWithItems = tempBoard.map((col) => col.map((cell) => {
						if (
							cell.col.number === newShipItem.place.col &&
							cell.row.number === newShipItem.place.row &&
							cell.cell === "empty"
						) {
							placeForShip = ++placeForShip
							tempFleetOnBoard = [...tempFleetOnBoard, {...newShipItem}]

							return {
								ship: {...newShipItem},
								...cell,
								cell: "ship",
							};
						} else {
							return cell;
						}
					}));
					tempBoard = [...boardWithItems]

					if ((placeForShip === numberOfShipElements)) {
						fleetOnBoard = [...fleetOnBoard, tempFleetOnBoard];
						if (mayTouch) {
							newBoard = [...tempBoard]
						} else {
							tempBoard.forEach((col) => col.forEach((cell) => {
								if (cell.cell === "ship") {
									const boardWithReserved = addReservedPlaceToBoard(tempBoard, cell);
									tempBoard = [...boardWithReserved]
									newBoard = [...boardWithReserved]
								}
							}))
						}
					}
				});
			}
		}
	)

	return {newBoard, fleetOnBoard};
};