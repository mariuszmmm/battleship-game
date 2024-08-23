import {shipsAvailable} from "./configPlay.jsx";
import {ver_1, ver_2} from "./configPlay.jsx";
import {randomMinMax} from "./randomMinMax.jsx";

export const getFleet = (numberOfShips) => {
	let version = {};
	switch (numberOfShips) {
		case "5":
			version = {...ver_1}
			break;
		case "10":
			version = {...ver_2}
			break;
		default:
			return;
	}

	let fleet = [];
	for (let key in version) {
		for (let step = 0; step < version[key]; step++) {
			const selectModels = randomMinMax(1, shipsAvailable[key].models.length)
			fleet = [...fleet, shipsAvailable[key].models[selectModels - 1]]
		}
	}


	return fleet;
}