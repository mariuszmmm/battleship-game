import {randomMinMax} from "./randomMinMax.jsx"

export const rotateShip = (ship, step = randomMinMax(1, 4)) => {
	const shipRotated = ship.map((item) => {
		let y_ = item.y
		let x_ = item.x
		switch (step) {
			case 1:
				return ({y: x_, x: -y_})
			case 2:
				return ({y: -y_, x: -x_});
			case 3:
				return ({y: -x_, x: y_});
			case 4:
				return item;
			default:
				return item;
		}
	})

	return shipRotated;
};