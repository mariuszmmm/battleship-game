import {shipsAvailable} from "./configPlay.jsx";
import {ver_1} from "./configPlay.jsx";
import {randomMinMax} from "./randomMinMax.jsx";

export const getFleet = () => {
	let fleet = [];
	for (let key in ver_1) {
		// console.log( key, ver_1[key])
		for (let step= 0; step < ver_1[key]; step++) {
			const selectModels = randomMinMax(1, shipsAvailable[key].models.length)
			fleet = [...fleet, shipsAvailable[key].models[selectModels - 1] ]
			 // console.log("selectModels: ",shipsAvailable[key].models[selectModels - 1]);
		}

	}

// console.log("ships",fleet)
	return fleet;
}
