import {shipsAvailable} from "../../../config/configShipGame";
import {shipVersions_1, shipVersions_2, shipVersions_3} from "../../../config/configShipGame";
import {randomMinMax} from "../../../utils/randomMinMax";
import {Coordinate, Parameters, ShipVersions} from "../../../types/types";

interface GetShipsProps {
	numberOfShips: Parameters["numberOfShips"];
	notStandardShips: Parameters["notStandardShips"];
}

export const getShips = ({numberOfShips, notStandardShips}: GetShipsProps) => {
	let version: ShipVersions;
	switch (numberOfShips) {
		case 5:
			version = {...shipVersions_1}
			break;
		case 7:
			version = {...shipVersions_2}
			break;
		case 10:
			version = {...shipVersions_3}
			break;
		default:
			version = {};
	}

	let ships: Coordinate[][] = [];
	for (const key in version) {
		const keyName = key as keyof ShipVersions;
		const availableVersion = version[keyName];
		if (!!availableVersion) {
			for (let step = 1; step <= availableVersion; step++) {
				const selectModels = randomMinMax(1, notStandardShips ? shipsAvailable[keyName].length : 1);
				ships = [...ships, shipsAvailable[keyName][selectModels - 1]];
			}
		}
	}

	ships = ships.sort((a, b) => b.length - a.length);

	return ships;
};