import {shipsAvailable} from "./configPlay.jsx";
import {ver_1} from "./configPlay.jsx";
import {randomMinMax} from "./randomMinMax.jsx";

export const getFleet = () => {
	let fleet = [];
	for (let key in ver_1) {
		for (let step = 0; step < ver_1[key]; step++) {
			const selectModels = randomMinMax(1, shipsAvailable[key].models.length)
			fleet = [...fleet, shipsAvailable[key].models[selectModels - 1]]
		}
	}

	return fleet;
}
