import {setLockedMoves} from "./setLockedMoves";
import {Board, LockedMoves, SettingShips, ShipItem} from "../../../types/types";

interface ChangeSelectedShip {
	board: Board;
	number: SettingShips["selectedShip"]["number"];
	selectedShip: ShipItem[];
	approvedSetting: SettingShips["approvedSetting"];
}

export const changeSelectedShip = ({board, number, selectedShip, approvedSetting}: ChangeSelectedShip) => {
	let boardWithSelected: Board;
	let newSelectedShip: ShipItem[] = [];
	let placesOtherShips: ShipItem["place"][] = [];

	board.forEach((col) => col.forEach((cell) => {
		if (cell.cell !== "ship" || cell.ship === null || cell.ship.numberOfShip !== number) return
		if (
			selectedShip.length === 0 ||
			cell.ship.numberOfShip !== selectedShip[0].numberOfShip
		) {
			newSelectedShip = [...newSelectedShip, cell.ship]
		}
	}));

	boardWithSelected = board.map((col) => col.map((cell) => {
		if (cell.ship === null) return {...cell};
		if (newSelectedShip.length > 0) {
			const shipItem = newSelectedShip.find((shipItem) =>
				(cell.col.number === shipItem.place.col &&
					cell.row.number === shipItem.place.row));
			return (shipItem)
				?
				{...cell, ship: {...cell.ship, selected: true}}
				:
				{...cell, ship: {...cell.ship, selected: false}};
		} else {
			return {...cell, ship: {...cell.ship, selected: false}};
		}
	}));

	boardWithSelected.forEach((col) => col.forEach((cell) => {
		if (cell.cell === "ship" && cell.ship && !cell.ship.selected) {
			placesOtherShips = [...placesOtherShips, cell.ship.place]
		}
	}));

	if (approvedSetting) {
		boardWithSelected = boardWithSelected.map((col) => col.map((cell) => (
			(cell.cell !== "ship") ? {...cell, cell: "empty"} : {...cell}
		)));
	}

	const lockedMoves: LockedMoves = setLockedMoves({ship: newSelectedShip, placesOtherShips})

	return {boardWithSelected, newSelectedShip, lockedMoves};
};