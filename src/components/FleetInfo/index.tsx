import React from "react";
import {Item, List} from "./styled";
import {selectSecondPlayerFleet} from "../../features/shipGame/shipGameSlice";
import {ShipSize} from "../../types/types";
import {useAppSelector} from "../../config/hooks";
import {Fleet} from "../../types/types"

interface FleetInfoProps {
	fleet: Fleet;
}

export const FleetInfo = ({fleet}: FleetInfoProps) => {
	const sizeOfShips: { [key in ShipSize]: string } = {
		size5: "pięciomasztowce",
		size4: "czteromasztowce",
		size3: "trzymasztowce",
		size2: "dwumasztowce",
		size1: "jednomasztowce",
	};

	const shipSizes: [keyof Fleet, number[]][] = Object.entries(fleet) as [keyof Fleet, number[]][];

	return (
		<List>
			{shipSizes.map(([key, shipNumbers]) =>
				<Item key={key}>
					{<span>{sizeOfShips[key as ShipSize]}:</span>}
					{<span>{shipNumbers.length}</span>}
				</Item>
			)}
		</List>
	);
};