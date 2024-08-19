import {randomMinMax} from "./randomMinMax.jsx"

export const rotateShip = (ship, step = randomMinMax(1, 4)) => {
	const shipRotated = ship.map((item) => {
		let y_ = item.y
		let x_ = item.x
		switch (step) {
			case 1:
				return item
			case 2:
				return ({y: x_, x: -y_});
			case 3:
				return ({y: -y_, x: -x_});
			case 4:
				return ({y: -x_, x: y_});
			default:
				return item;
		}
	})

	return shipRotated;
};