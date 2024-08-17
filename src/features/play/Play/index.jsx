import {BoardSection, BoardCell, PlayWrapper, ShipsBoard, ColName, RowName, Button, ShipItem} from "./styled.jsx";
import {boardSchemat} from "./boardSchemat.jsx";
import { useRandomShips} from './useRandomShips.jsx';
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectBoard, setBoard} from "../playSlice.jsx";

export const Play = () => {
	// const [board, setBoard] = useState(boardSchemat);
	const board = useSelector(selectBoard);
	const dispatch = useDispatch();
	const {buildShip} = useRandomShips();


	useEffect(() => {
		// randomShips()
		// dispatch(setBoard(buildShip()));
		buildShip();
	}, []);

	// console.log(board);

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
				<Button onClick={() => buildShip()}> Random ships </Button>
			</BoardSection>
		</PlayWrapper>
	)
};
