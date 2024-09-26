import {randomMinMax} from "../../../utils/randomMinMax.jsx";
import {coordinatesAround, directNeighbors} from "../../../utils/coordinates.jsx";

export const computerChooses = ({difficultyLevel, boardToShots, mayTouch}) => {
	let allCells = [];
	let hits = [];
	let excluded = [];

	const setNeighbors = (cell, neighborsFor) => {
		let neighbors = [];
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
			allCells = [...allCells, [cell.id, cell.cell, cell.target, cell.shipState]];
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
				hits.includes(cell[0]) &&
				!excluded.includes(cell[0]) &&
				cell[1] === "empty" && cell[2] !== "missed"
			))
			:
			allCells = allCells.filter((cell) => (
				!excluded.includes(cell[0]) &&
				cell[1] === "empty" && cell[2] !== "missed"
			));
	}

	if (difficultyLevel === "medium") {
		allCells = allCells.filter((cell) =>
			cell[1] === "empty" && cell[2] !== "missed" &&
			cell[2] !== "hit" && cell[3] !== "sunk"
		)
	}

	if (allCells.length === 0) return;
	const newTarget = randomMinMax(0, allCells.length - 1);

	return allCells[newTarget][0];
}