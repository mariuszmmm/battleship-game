import {
	BoardSection,
	BoardCell,
	PlayWrapper,
	ShipsBoard,
	ColName, RowName,
	Button,
	ShipItem, Reserved,Settings
} from "./styled.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectBoard, selectState, setStateNewGame} from "../playSlice.jsx";
import {ArrowLeftIcon, Back} from "../../../components/Back/index.jsx";
import {StyledLink} from "../../../components/StyledLink/index.jsx";
import {PlayIcon} from "../../../components/Icons/index.jsx";

export const Play = () => {
	const board = useSelector(selectBoard);
	const state = useSelector(selectState);
	const dispatch = useDispatch();

	const onRandomShips = () => {
		dispatch(setStateNewGame());
	}

	useEffect(() => {
		if (state === "ready") dispatch(setStateNewGame());

		// eslint-disable-next-line
	}, []);

	return (
		<PlayWrapper>
			<Back to="/"><ArrowLeftIcon/></Back>
			<BoardSection>
				<ShipsBoard>
					{board.map((col, colIndex) =>
						col.map((cell, cellIndex) =>
							<BoardCell key={cell.id}>
								{cellIndex === 0 && <ColName>{cell.col.name}</ColName>}
								{colIndex === 0 && <RowName>{cell.row.name}</RowName>}
								{cell.cell === "ship" &&
									<ShipItem key={cell?.id}
									          $hasNeighborTop={cell.hasNeighborTop}
									          $hasNeighborRight={cell.hasNeighborRight}
									          $hasNeighborLeft={cell.hasNeighborLeft}
									          $hasNeighborBottom={cell.hasNeighborBottom}
									/>}
								{/*{console.log(cell)}*/}
								{cell.cell === "reserved" && <Reserved key={cell?.id}/>}
							</BoardCell>))}
				</ShipsBoard>
				<Settings>
					<Button onClick={() => onRandomShips()}> Random ships </Button>

				</Settings>
				<StyledLink to="">START<PlayIcon/></StyledLink>
			</BoardSection>
		</PlayWrapper>
	)
};