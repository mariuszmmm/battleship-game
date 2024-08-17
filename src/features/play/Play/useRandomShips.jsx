import {useDispatch, useSelector} from "react-redux";
import {setBoard, selectBoard} from "../playSlice.jsx"
import {randomMinMax} from "./randomMinMax.jsx";
import {getFleet} from "./getFleet.jsx";
import * as row_ from "./boardSchemat.jsx";
import {row} from "./boardSchemat.jsx";

export const useRandomShips = () => {
	const dispatch = useDispatch();
	const board = useSelector(selectBoard);
	let newBoard = board;

	const buildShip = () => {
		const fleet = getFleet();
		fleet.map((ship) => {
			const shipSize = ship.length;
			let placeForShip = 0;

			while (placeForShip < shipSize) {
				const colRandom = randomMinMax(1, 10);
				const rowRandom = randomMinMax(1, 10);
				let newShip = [];
				ship.map((shipItem) => {
					const newItem = {col: colRandom + shipItem.y, row: rowRandom + shipItem.x}
					newShip = [...newShip, newItem]
				})
				newShip.forEach((newShipItem) => {


					const boardWithItems = newBoard.map((col) => col.map((cell) => {
						if (cell.col.number === newShipItem.col && cell.row.number === newShipItem.row && cell.cell === "empty") {
							placeForShip = ++placeForShip
							return {...cell, cell: "ship"};
						} else {
							return cell;
						}
					}));

					newBoard = [...boardWithItems];

					// tempBoard.forEach((array) => array.forEach((i) => {
					// 	if (i.cell === "ship") {
					// 		console.log("cell === ship", i.id)
					// 	}
					// }))

					if ((placeForShip === shipSize)) {


						newBoard.forEach((col) => col.forEach((cell) => {
							if (cell.cell === "ship") {
								console.log(cell)
								const boardWithReserved = newBoard.map((col_) => col_.map((row_) => {
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
											console.log("RESErv")
											return {...row_, cell: "reserved"}
										} else {
											return row_
										}
									}
								))

								newBoard = [...boardWithReserved]

							}
						}));

						console.log(newBoard)
						dispatch(setBoard(newBoard))
					}
				});
			}
		})
	}

	return {
		buildShip
	}
};