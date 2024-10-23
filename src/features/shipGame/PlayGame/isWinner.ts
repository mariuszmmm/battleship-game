import {Fleet} from "../../../types/types";

interface IsWinner {
	fleet: Fleet;
	activePlayer: "firstPlayer" | "secondPlayer";
}

export const isWinner = ({fleet, activePlayer}: IsWinner) => {
	let ships = 0;

	for (const typeShips in fleet) {
		const type = typeShips as keyof Fleet;
		ships += fleet[type].length;
	}

	return (ships ? null : activePlayer);
};