import {randomMinMax} from "../../../utils/randomMinMax.jsx";

export const rotateSelectedShip = ({board, selected}) => {
	const {rotateStep} = selected;
	const ship = board.forEach((col) => col.filter((row) => {
		console.log(row.rotateStep)
		if (row.selected) {
			console.log(row)
		}
	}))

	// const shipRotated = ship.map((item) => {
	// 	let y_ = item.y
	// 	let x_ = item.x
	// 	switch (step) {
	// 		case 1:
	// 			return {y: x_, x: -y_, rotateStep: step};
	// 		case 2:
	// 			return {y: -y_, x: -x_, rotateStep: step};
	// 		case 3:
	// 			return {y: -x_, x: y_, rotateStep: step};
	// 		case 4:
	// 			return {...item, rotateStep: step};
	// 		default:
	// 			return {...item, rotateStep: step};
	// 	}
	// })

	return board;
};