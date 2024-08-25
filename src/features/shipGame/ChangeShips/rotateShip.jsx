import {randomMinMax} from "../../../utils/randomMinMax.jsx"

export const rotateShip = (ship, step = randomMinMax(1, 4)) => {
	const shipRotated = ship.map((item) => {
		let row = item.y
		let col = item.x
		switch (step) {
			case 1:
				return {y: col, x: -row, rotateStep: step};
			case 2:
				return {y: -row, x: -col, rotateStep: step};
			case 3:
				return {y: -col, x: row, rotateStep: step};
			case 4:
				return {...item, rotateStep: step};
			default:
				return {...item, rotateStep: step};
		}
	})

	return shipRotated;
};