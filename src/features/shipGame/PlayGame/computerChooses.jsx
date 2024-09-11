import {randomMinMax} from "../../../utils/randomMinMax.jsx";

export const computerChooses = () => {
	const col = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	const row = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
	const colRandom = randomMinMax(0, 9);
	const rowRandom = randomMinMax(0, 9);

	return `${col[colRandom]}${row[rowRandom]}`;
}