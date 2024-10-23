import {coordinatesAround} from "../../../utils/coordinates"
import {Board, ShipItem} from "../../../types/types";

export const warningsAroundCell = (allShip: ShipItem[], board: Board) => {
	let warningsForShipNumbers: number[] = [];

	allShip.forEach((ship) => {
		board.forEach((col) => col.forEach((cell) => {
			if (coordinatesAround.some((coordinate) =>
				(ship.place.col === cell.col.number + coordinate[0]) &&
				(ship.place.row === cell.row.number + coordinate[1]) &&
				cell.cell === "ship" && cell.ship &&
				(ship.numberOfShip !== cell.ship.numberOfShip)
			)) {
				if (!warningsForShipNumbers.includes(ship.numberOfShip)) {
					warningsForShipNumbers = [...warningsForShipNumbers, ship.numberOfShip];
				}
			}
		}));
	});

	return warningsForShipNumbers;
};