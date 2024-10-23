import {changesShip} from "./changesShip";
import {setPlacesAroundCell} from "../../../utils/setPlacesAroundCell"
import {warningsAroundCell} from "./warningsAroundCell";
import {setLockedMoves} from "./setLockedMoves";
import {Board, ChangeShipPlace, LockedMoves, ShipItem} from "../../../types/types";

interface MoveShipProps {
	board: Board,
	change: ChangeShipPlace,
	mayTouch: boolean,
	selectedShip: ShipItem[],
}

export const moveShip = ({board, change, mayTouch, selectedShip}: MoveShipProps) => {
	let newSelectedShip: ShipItem[] = [...selectedShip];
	let boardWithMoved: Board;
	let wrongSettingOfShips = false;
	let placesOtherShips: ShipItem["place"][] = [];

	board.forEach((col) => col.forEach((cell) => {
		if (cell.cell === "ship" && !cell.ship?.selected) {
			if (cell.ship) placesOtherShips = [...placesOtherShips, cell.ship.place]
		}
	}));

	const boardWithOutSelectedShip: Board = board.map((col) => col.map((cell) =>
		newSelectedShip.some((shipItem) => {
				return (
					(cell.col.number === shipItem.place.col) &&
					(cell.row.number === shipItem.place.row)
				)
			}
		) ? ({...cell, ship: null, cell: "empty"})
			:
			({...cell})
	));
	const movedShip = changesShip(change, newSelectedShip);

	boardWithMoved = boardWithOutSelectedShip.map((col) =>
		col.map((cell) => {
			let foundItem = movedShip.find((shipItem) =>
				((cell.row.number === shipItem.place.row) &&
					(cell.col.number === shipItem.place.col)));

			return foundItem ?
				({...cell, ship: foundItem, cell: "ship"}) : ({...cell});
		})
	);

	let tempBoard = [...boardWithMoved];

	if (!mayTouch) {
		let allShip: ShipItem[] = [];

		const clearEmptyOnBoard: Board = tempBoard.map((col) => col.map((cell) => {
			if (cell.cell === "ship") {
				if (cell.ship) allShip = [...allShip, cell.ship]
				return {...cell};
			} else {
				return {...cell, cell: "empty"};
			}
		}));
		tempBoard = [...clearEmptyOnBoard];

		tempBoard.forEach((col) => col.forEach((cell) => {
			if (cell.cell !== "ship") return;
			const boardWithReserved: Board = setPlacesAroundCell(tempBoard, cell, "cell", "reserved");
			tempBoard = [...boardWithReserved];
		}));

		const warningsForShipNumbers = warningsAroundCell(allShip, tempBoard);
		let boardWithReserved = [];
		tempBoard.forEach((col) => col.forEach((cell) => {
			if (cell.cell !== "ship" || !cell.ship || !warningsForShipNumbers.includes(cell.ship.numberOfShip)) return;
			boardWithReserved = setPlacesAroundCell(tempBoard, cell, "cell", "warning")
			tempBoard = [...boardWithReserved];
		}));
		boardWithMoved = [...tempBoard];
	}

	newSelectedShip = [];
	boardWithMoved.forEach((col) => col.forEach((cell) => {
		if (cell.ship?.selected) newSelectedShip = [...newSelectedShip, cell.ship]
		if (cell.cell === "warning") {
			wrongSettingOfShips = true;
		}
	}));

	const lockedMoves: LockedMoves = setLockedMoves({ship: movedShip, placesOtherShips});

	return {newSelectedShip, boardWithMoved, lockedMoves, wrongSettingOfShips};
};