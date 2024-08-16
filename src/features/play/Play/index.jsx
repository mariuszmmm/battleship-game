import {BoardSection, BoardCell, PlayWrapper, ShipsBoard, ColName, RowName, Button, ShipItem} from "./styled.jsx";
import {boardSchemat} from "./boardSchemat.jsx";
import {randomShips} from './ships.jsx';
import {useState, useEffect} from "react";

export const Play = () => {
	const [board, setBoard] = useState(boardSchemat);

	// console.log(board);

	useEffect(() => {
		randomShips(board, setBoard)
	}, [])

	return (
		<PlayWrapper>
			<BoardSection>
				<ShipsBoard>
					{board.map((col, colIndex) =>
						col.map((cell, cellIndex) =>
							<BoardCell key={cell.id}>
								{cellIndex === 0 && <ColName>{cell?.col?.name}</ColName>}
								{colIndex === 0 && <RowName>{cell?.row?.name}</RowName>}
								{cell.cell === "ship" && <ShipItem key={cell?.id}/>}
							</BoardCell>))}
				</ShipsBoard>
				<Button onClick={() => randomShips(board, setBoard)}> Random ships </Button>
			</BoardSection>
		</PlayWrapper>
	)
};
