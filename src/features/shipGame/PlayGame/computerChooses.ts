import {randomMinMax} from "../../../utils/randomMinMax.js";
import {coordinatesAround, directNeighbors} from "../../../utils/coordinates";
import {Board, Parameters, Cell} from "../../../types/types";

interface ComputerChooses {
	difficultyLevel: Parameters["difficultyLevel"];
	boardToShots: Board;
	mayTouch: Parameters["mayTouch"];
}

type setNeighborsProps = "hits" | "excluded";

type AllCells = {
	id: Cell["id"];
	cell: Cell["cell"];
	target: Cell["target"];
	shipState: Cell["shipState"];
}[];

export const computerChooses = ({difficultyLevel, boardToShots, mayTouch}: ComputerChooses) => {
	let allCells: AllCells = [];
	let hits: Cell["id"][] = [];
	let excluded: Cell["id"][] = [];

	const setNeighbors = (cell: Cell, neighborsFor: setNeighborsProps) => {
		let neighbors: Cell["id"][] = [];
		const selectedCoordinates = (neighborsFor === "excluded" ? coordinatesAround : directNeighbors);

		boardToShots.forEach((col) => col.forEach((row) => (
			selectedCoordinates.forEach((coordinate) => {
				if ((row.col.number === cell.col.number + coordinate[0]) &&
					(row.row.number === cell.row.number + coordinate[1])
					&& row.cell === "empty" && row.target !== "hit" &&
					row.target !== "missed" && row.shipState !== "sunk"
				) {
					neighbors = [...neighbors, row.id];
				}
			})
		)));

		return neighbors;
	};

	boardToShots.forEach((col) =>
		col.forEach((cell) => {
			allCells = [...allCells,
				{id: cell.id, cell: cell.cell, target: cell.target, shipState: cell.shipState}
			];
			if (cell.target === "hit") {
				hits = [...hits, ...setNeighbors(cell, "hits")]
			}
			if (cell.shipState === "sunk" && !mayTouch) {
				excluded = [...excluded, ...setNeighbors(cell, "excluded")]
			}
		})
	);

	if (difficultyLevel === "difficult") {
		hits.length > 0 ?
			allCells = allCells.filter((cell) => (
				hits.includes(cell.id) &&
				!excluded.includes(cell.id) &&
				cell.cell === "empty" && cell.target !== "missed"
			))
			:
			allCells = allCells.filter((cell) => (
				!excluded.includes(cell.id) &&
				cell.cell === "empty" && cell.target !== "missed"
			));
	}

	if (difficultyLevel === "medium") {
		allCells = allCells.filter((cell) =>
			cell.cell === "empty" && cell.target !== "missed" &&
			cell.target !== "hit" && cell.shipState !== "sunk"
		)
	}

	if (allCells.length === 0) return;
	const newTarget = randomMinMax(0, allCells.length - 1);

	return allCells[newTarget].id;
}