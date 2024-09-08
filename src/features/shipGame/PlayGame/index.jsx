import {Section} from "../../../components/Section";
import {Content, Info, PlayGameWrapper, BoardsWrapper, InfoWrapper, TargetDisplay} from "./styled";
import {ShipsBoard} from "../../../components/ShipsBoard";
import {useDispatch, useSelector} from "react-redux";
import {
	selectActivePlayer,
	selectComputerBoard,
	selectComputerBoardToShots, selectComputerTarget,
	selectFirstPlayerBoard,
	selectFirstPlayerBoardToShots,
	selectFirstPlayerFleet, selectFirstPlayerNumberOfShots, selectFirstPlayerTarget,
	selectShots,
	setShips,
	setShot,selectComputerNumberOfShots
} from "../shipGameSlice.jsx"
import {Button, Exit} from "../../../components/Buttons/index.jsx";
import {X_markIcon} from "../../../components/Icons/index.jsx";

export const PlayGame = () => {
	const firstPlayerBoard = useSelector(selectFirstPlayerBoard)
	const firstPlayerBoardToShots = useSelector(selectFirstPlayerBoardToShots)
	const firstPlayerTarget = useSelector(selectFirstPlayerTarget)
	const firstPlayerNumberOfShots = useSelector(selectFirstPlayerNumberOfShots)

	const computerBoard = useSelector(selectComputerBoard)
	const computerBoardToShots = useSelector(selectComputerBoardToShots)
	const computerTarget = useSelector(selectComputerTarget)
	const computerNumberOfShots = useSelector(selectComputerNumberOfShots)


	const activePlayer = useSelector(selectActivePlayer);

	const dispatch = useDispatch();
	const shots = useSelector(selectShots);
	const fleet = useSelector(selectFirstPlayerFleet);

	return (<Section>
		<PlayGameWrapper>
			<Exit to="/home" onClick={() => dispatch(setShips())}><X_markIcon/></Exit>
			<Content>
				<BoardsWrapper>
					<ShipsBoard board={firstPlayerBoardToShots}
					            player={"firstPlayer"}
					/>
					<ShipsBoard board={firstPlayerBoard}/>
					<ShipsBoard board={computerBoardToShots}
					            player={"computer"}
					/>
					<ShipsBoard board={computerBoard}/>
				</BoardsWrapper>
				<InfoWrapper>
					<Info>
						Ilość strzałów: <br/>
						{firstPlayerNumberOfShots}
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
						<TargetDisplay>namierzony: {firstPlayerTarget}</TargetDisplay>
						<Button
							onClick={() => dispatch(setShot({
								shot: firstPlayerTarget,
								boardToShots: firstPlayerBoardToShots,
								activePlayer
							}))}>
							STRZAŁ
						</Button>
					</Info>


					<Info>
						Ilość strzałów: <br/>

						{computerNumberOfShots}
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
						<TargetDisplay>namierzony: {computerTarget}</TargetDisplay>
						<Button onClick={() => dispatch(setShot({
							shot: computerTarget,
							boardToShots: computerBoardToShots,
							activePlayer
						}))}>
							STRZAŁ
						</Button>
					</Info>
				</InfoWrapper>
			</Content>
		</PlayGameWrapper>
	</Section>)
};