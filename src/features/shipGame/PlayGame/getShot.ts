import {setPlacesAroundCell} from "../../../utils/setPlacesAroundCell";
import {Board, CellId, Fleet, Parameters, ShipItem} from "../../../types/types";

interface GetShot {
	boardToShots: Board;
	board: Board;
	shotInCell: CellId;
	fleet: Fleet;
	mayTouch: Parameters["mayTouch"];
}

export const getShot = ({boardToShots, board, shotInCell, fleet, mayTouch}: GetShot) => {
	let hitShip: ShipItem | undefined;
	let newFleet = {...fleet};
	let shipsNumber = 0;

	const deleteItemFromFleet = (numberOfShip: number) => {
		for (const key in fleet) {
			const size = key as keyof Fleet;
			const index = fleet[size].indexOf(numberOfShip);
			if (index !== -1) {
				newFleet[size] = [...fleet[size].slice(0, index), ...fleet[size].slice(index + 1)];
			} else {
				newFleet[size] = [...fleet[size]];
			}
		}
	};

	let boardAfterShot: Board = board.map((col) => col.map((cell) => {
			if (cell.id === shotInCell && cell.shipState !== "sunk") {
				if (cell.cell === "ship" && cell.ship !== null) {
					hitShip = {...cell.ship}
					return {...cell, shipState: "hit"};
				} else {
					return {...cell, target: "missed"};
				}
			} else {
				return {...cell}
			}
		}
	));


	let numberOfSunkElements = 0;
	boardAfterShot.forEach((col) => col.forEach((cell) => {
		if (cell.cell !== "ship" || cell.ship === null || hitShip === undefined) return;
		if (cell.ship.numberOfShip === hitShip.numberOfShip && cell.shipState === "hit") {
			++numberOfSunkElements;
		}
	}));

	const isSunkShip = hitShip ? numberOfSunkElements === hitShip.sizeOfShip : false;

	if (isSunkShip) {
		if (hitShip) deleteItemFromFleet(hitShip.numberOfShip);
		boardAfterShot = boardAfterShot.map((col) => col.map((cell) => {
			if (cell.cell === "ship" && cell.ship?.numberOfShip === hitShip?.numberOfShip) {
				return {...cell, shipState: "sunk"};
			} else {
				return {...cell};
			}
		}));

		if (!mayTouch) {
			boardAfterShot.forEach((col) => col.forEach((cell) => {
				if (cell.shipState === "sunk") {
					boardAfterShot = setPlacesAroundCell(boardAfterShot, cell, "target", "missed");
				}
			}))
		}
	}

	let boardToShotsAfterShot: Board = boardToShots.map((col) => col.map((cell) =>
		cell.id === shotInCell && cell.shipState !== "sunk"
			?
			(hitShip ?
					{...cell, ship: hitShip, cell: "ship", target: "hit", cellState: null}
					:
					{...cell, target: "missed", cellState: null}
			)
			:
			{...cell, cellState: null}
	));

	if (hitShip && isSunkShip) {
		boardToShotsAfterShot = boardToShotsAfterShot.map((col) => col.map((cell) => {
			if (cell.ship?.numberOfShip === hitShip?.numberOfShip) {
				return {...cell, target: null, shipState: "sunk"}
			} else {
				return {...cell}
			}
		}));

		if (!mayTouch) {
			boardToShotsAfterShot.forEach((col) => col.forEach((cell) => {
				if (cell.shipState === "sunk") {
					boardToShotsAfterShot = setPlacesAroundCell(boardToShotsAfterShot, cell, "target", "missed")
				}
			}))
		}
	}

	for (const key in newFleet) {
		const size = key as keyof Fleet;
		shipsNumber = shipsNumber + newFleet[size].length
	}

	return {boardAfterShot, boardToShotsAfterShot, newFleet, shipsNumber, isSunkShip, hitShip};
};