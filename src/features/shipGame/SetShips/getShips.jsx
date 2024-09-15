import {shipsAvailable} from "./configShipGame.jsx";
import {ver_1, ver_2,ver_3} from "./configShipGame.jsx";
import {randomMinMax} from "../../../utils/randomMinMax.jsx";

export const getShips = (numberOfShips) => {
	let version = {};
	switch (numberOfShips) {
		case 5:
			version = {...ver_1}
			break;
		case 7:
			version = {...ver_2}
			break;
		case 10:
			version = {...ver_3}
			break;
		default:
			return;
	}
	let ships = [];
	for (let key in version) {
		for (let step = 1; step <= version[key]; step++) {
			const selectModels = randomMinMax(1, shipsAvailable[key].length)
			ships = [...ships, shipsAvailable[key][selectModels - 1]]
		}
	}

	return ships;
};