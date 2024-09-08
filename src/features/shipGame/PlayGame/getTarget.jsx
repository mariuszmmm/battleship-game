export const getTarget = ({target, boardToShots}) => {

	return boardToShots.map((col) => col.map((cell) => {
		if (cell.id === target) {
			if (cell.target === "hit") {
				return cell
			} else {
				return {...cell, target: "set"}
			}
		} else {
			if (cell.target === "set") {
				return {...cell, target: null}
			} else {
				return {...cell}
			}
		}
	}))
};
