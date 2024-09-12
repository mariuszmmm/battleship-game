import {Item, List} from "./styled.jsx";

export const FleetInfo = ({fleet, keys}) => {
	let info = {
		pięciomasztowce: 0,
		czteromasztowce: 0,
		trzymasztowce: 0,
		dwumasztowce: 0,
		jednomasztowce: 0,
	}

	fleet.forEach((ship) => {
			switch (ship.length) {
				case 1:
					info.jednomasztowce++
					break;
				case 2:
					info.dwumasztowce++
					break;
				case 3:
					info.trzymasztowce++
					break;
				case 4:
					info.czteromasztowce++
					break;
				case 5:
					info.pięciomasztowce++
					break;
				default:
					return;
			}
		}
	)

	return (
		<List key={keys}>
			{info.pięciomasztowce > 0 && <Item>{info.pięciomasztowce} x pięciomasztowce</Item>}
			{info.czteromasztowce > 0 && <Item>{info.czteromasztowce} x czteromasztowce</Item>}
			{info.trzymasztowce > 0 && <Item>{info.trzymasztowce} x trzymasztowce</Item>}
			{info.dwumasztowce > 0 && <Item>{info.dwumasztowce} x dwumasztowce</Item>}
			{info.jednomasztowce > 0 && <Item>{info.jednomasztowce} x jednomasztowce</Item>}
		</List>
	)
}