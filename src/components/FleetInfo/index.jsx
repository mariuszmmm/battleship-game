import {Item, List} from "./styled.jsx";
import {useSelector} from "react-redux";
import {selectSecondPlayerFleet} from "../../features/shipGame/shipGameSlice.jsx";

export const FleetInfo = () => {
	const info = {
		size5: "pięciomasztowce",
		size4: "czteromasztowce",
		size3: "trzymasztowce",
		size2: "dwumasztowce",
		size1: "jednomasztowce",
	};
	const secondPlayerFleet = useSelector(selectSecondPlayerFleet);
	const shipSizes = Object.entries(secondPlayerFleet)

	return (
		<List>
			{shipSizes.map(([key, shipNumbers]) =>
				<Item key={key}>
					{<span>{info[key]}:</span>}
					{<span>{shipNumbers.length}</span>}
				</Item>
			)}
		</List>
	)
};