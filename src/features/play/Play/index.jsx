import {
	BoardCell,
	PlayWrapper,
	ShipsBoard,
	ColName, RowName,
	ShipItem, Reserved, Settings, SetShips
} from "./styled.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectBoard, selectState, setStateNewGame} from "../playSlice.jsx";
import {Back, Button, StyledLink} from "../../../components/Buttons/index.jsx";
import {
	ArrowDownIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowTopIcon, CheckIcon,
	PlayIcon,
	RandomIcon,
	RotateRightIcon,
	ArrowBackIcon
} from "../../../components/Icons/index.jsx";
import {Section} from "../../../components/Section/index.jsx";

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
		<Section>
			<PlayWrapper>
				<Back to="/settings"><ArrowBackIcon/></Back>
				<SetShips>
					<ShipsBoard>
						{board.map((col, colIndex) =>
							col.map((cell, cellIndex) =>
								<BoardCell key={cell.id} $ship={cell.cell === "ship"}>
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
						<Button $area="random" onClick={() => onRandomShips()}>
							<RandomIcon/> Random ships
						</Button>
						<Button $area="arrow-top">
							<ArrowTopIcon/>
						</Button>
						<Button $area="arrow-left">
							<ArrowLeftIcon/>
						</Button>
						<Button $area="rotate">
							<RotateRightIcon/>
						</Button>
						<Button $area="arrow-right">
							<ArrowRightIcon/>
						</Button>
						<Button $area="arrow-down">
							<ArrowDownIcon/>
						</Button>
						<Button $area="check-on">
							<CheckIcon/>
						</Button>
					</Settings>
				</SetShips>
				<StyledLink to="">START<PlayIcon/></StyledLink>
			</PlayWrapper>
		</Section>
	)
};