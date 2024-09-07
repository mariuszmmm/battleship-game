import {Section} from "../../../components/Section";
import {Content, Info, PlayGameWrapper, BoardsWrapper, InfoWrapper, TargetDisplay} from "./styled";
import {ShipsBoard} from "../../../components/ShipsBoard";
import {useDispatch, useSelector} from "react-redux";
import {
	selectComputerBoard,
	selectComputerBoardToShots, selectComputerTargetedCell,
	selectFirstPlayerBoard,
	selectFirstPlayerBoardToShots,
	selectFirstPlayerFleet, selectFirstPlayerTargetedCell,
	selectShots,
	setShips
} from "../shipGameSlice.jsx"
import {Button, Exit} from "../../../components/Buttons/index.jsx";
import {XmarkIcon} from "../../../components/Icons/index.jsx";

export const PlayGame = () => {
	const firstPlayerBoard = useSelector(selectFirstPlayerBoard)
	const firstPlayerBoardToShots = useSelector(selectFirstPlayerBoardToShots)
	const firstPlayerTargetedCell = useSelector(selectFirstPlayerTargetedCell)

	const computerBoard = useSelector(selectComputerBoard)
	const computerBoardToShots = useSelector(selectComputerBoardToShots)
	const computerTargetedCell = useSelector(selectComputerTargetedCell)

	const dispatch = useDispatch();
	const shots = useSelector(selectShots);
	const fleet = useSelector(selectFirstPlayerFleet);

	return (<Section>
		<PlayGameWrapper>
			<Exit to="/home" onClick={() => dispatch(setShips())}><XmarkIcon/></Exit>
			<Content>
				<BoardsWrapper>
					<ShipsBoard board={firstPlayerBoardToShots}
					            activeBoard={"firstPlayerBoardToShots"}
					/>
					<ShipsBoard board={firstPlayerBoard}
					            activeBoard={"firstPlayerBoard"}
					/>
					<ShipsBoard board={computerBoardToShots}
					            activeBoard={"computerBoardToShots"}
					/>
					<ShipsBoard board={computerBoard}
					            activeBoard={"computerBoard"}
					/>
				</BoardsWrapper>
				<InfoWrapper>
					<Info>
						Ilość strzałów: <br/>
						{shots.number}
					</Info>
					<Info>
						Ilość pozostałych statków: <br/>
						<ul>
							<li>1 x czteromasztowiec</li>
							<li>2 x trzymasztowce</li>
							<li>3 x dwumasztowce</li>
							<li>4 x jednomasztowce</li>
						</ul>
					</Info>

					<Info>
						<TargetDisplay>namierzony: {firstPlayerTargetedCell?.id}</TargetDisplay>
						<Button>STRZAŁ</Button>
					</Info>


					<Info>
						Ilość strzałów: <br/>

						{shots.number}
					</Info>
					<Info>
						Ilość pozostałych statków: <br/>
						<ul>
							<li>1 x czteromasztowiec</li>
							<li>2 x trzymasztowce</li>
							<li>3 x dwumasztowce</li>
							<li>4 x jednomasztowce</li>
						</ul>
					</Info>

					<Info>
						<TargetDisplay>namierzony: {computerTargetedCell?.id}</TargetDisplay>
						<Button>STRZAŁ</Button>
					</Info>
				</InfoWrapper>
			</Content>


		</PlayGameWrapper>
	</Section>)
};