import {randomMinMax} from "../../../utils/randomMinMax";
import {rotateShip} from "./rotateShip";
import {itemHasNeighbor} from "./itemHasNeighbor";
import {setPlacesAroundCell} from "../../../utils/setPlacesAroundCell";
import {Board, Fleet, ShipItem} from "../../../types/types";
import {Coordinate} from "../../../types/types";

interface AddRandomShips {
	board: Board;
	mayTouch: boolean;
	ships: Coordinate[][];
}

export const addRandomShips = ({board, mayTouch, ships}: AddRandomShips) => {
	let newBoard: Board = board.map(row => row.map(cell => ({...cell})));
	let allShips: ShipItem[][] = [];

	ships.forEach((shipCoordinates, index) => {
		const numberOfShipElements = shipCoordinates.length;
		let placeForShip = 0;
		let newShip: ShipItem[] = [];

		while (placeForShip < numberOfShipElements) {
			placeForShip = 0;
			newShip = [];
			const colRandom = randomMinMax(0, 9);
			const rowRandom = randomMinMax(0, 9);
			const shipRandomRotated = rotateShip(shipCoordinates, randomMinMax(0, 3));

			shipRandomRotated.forEach((shipItem) => {
				const newItem: ShipItem = {
					place: {
						col: colRandom + shipItem.y, row: rowRandom + shipItem.x,
					}, numberOfShip: index + 1, sizeOfShip: shipRandomRotated.length, selected: false
				}
				newShip = [...newShip, newItem];
			});
			newShip = [...itemHasNeighbor(newShip)];

			let tempBoard: Board = [...newBoard];
			newShip.forEach((newShipItem) => {
				const boardWithItems: Board = tempBoard.map((col) => col.map((cell) => {
					if (cell.col.number === newShipItem.place.col &&
						cell.row.number === newShipItem.place.row &&
						cell.cell === "empty") {
						placeForShip++;

						return {...cell, ship: {...newShipItem}, cell: "ship",}
					} else {

						return {...cell};
					}
				}));
				tempBoard = [...boardWithItems]

				if ((placeForShip === numberOfShipElements)) {
					allShips = [...allShips, newShip]
					if (mayTouch) {
						newBoard = [...tempBoard]
					} else {
						tempBoard.forEach((col) => col.forEach((cell) => {
							if (cell.cell === "ship") {
								const boardWithReserved = setPlacesAroundCell(tempBoard, cell, "cell", "reserved");
								tempBoard = [...boardWithReserved]
								newBoard = [...boardWithReserved]
							}
						}));
					}
				}
			});
		}
	})
	newBoard = newBoard.map((col) => col.map((cell) => ((cell.cell !== "ship") ? {...cell, cell: "empty"} : {...cell})));

	const fleet = allShips.reduce((acc, cur) => {
		const key = `size${cur[0].sizeOfShip}` as keyof Fleet;
		const number = cur[0].numberOfShip;

		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(number);

		return acc
	}, {} as Fleet)

	return {fleet, newBoard}
};