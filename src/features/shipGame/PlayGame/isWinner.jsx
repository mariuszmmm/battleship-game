export const isWinner = ({fleet, activePlayer}) => {
	let ships = 0;

	for (const typeShips in fleet) {
		ships += fleet[typeShips].length
	}

	return (ships ? null : activePlayer);
}