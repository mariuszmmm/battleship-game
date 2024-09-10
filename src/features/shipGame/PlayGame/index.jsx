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
	selectFirstPlayerNumberOfShots, selectFirstPlayerTarget,
	setShips,
	setShot, selectComputerNumberOfShots,
} from "../shipGameSlice.jsx"
import {Button, Exit} from "../../../components/Buttons/index.jsx";
import {X_markIcon} from "../../../components/Icons/index.jsx";

export const PlayGame = () => {
	const firstPlayerBoard = useSelector(selectFirstPlayerBoard)
	const firstPlayerBoardToShots = useSelector(selectFirstPlayerBoardToShots)
	const firstPlayerTargetInCel = useSelector(selectFirstPlayerTarget)
	const firstPlayerNumberOfShots = useSelector(selectFirstPlayerNumberOfShots)

	const computerBoard = useSelector(selectComputerBoard)
	const computerBoardToShots = useSelector(selectComputerBoardToShots)
	const computerTargetInCel = useSelector(selectComputerTarget)
	const computerNumberOfShots = useSelector(selectComputerNumberOfShots)
	const activePlayer = useSelector(selectActivePlayer);

	const dispatch = useDispatch();
	const playersName = ["firstPlayer", "computer"]

	return (<Section>
		<PlayGameWrapper>
			<Exit to="/home" onClick={() => dispatch(setShips())}><X_markIcon/></Exit>
			<Content>
				<BoardsWrapper>
					<ShipsBoard board={firstPlayerBoardToShots}
					            player={playersName[0]}
					/>
					<ShipsBoard board={firstPlayerBoard}/>
					<ShipsBoard board={computerBoardToShots}
					            player={playersName[1]}
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
						<TargetDisplay>namierzony: {firstPlayerTargetInCel}</TargetDisplay>
						<Button
							onClick={() => dispatch(setShot({
								shotInCell: firstPlayerTargetInCel,
								boardToShots: firstPlayerBoardToShots,
							}))}
							disabled={activePlayer !== playersName[0]}
						>
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
						<TargetDisplay>namierzony: {computerTargetInCel}</TargetDisplay>
						<Button onClick={() => dispatch(setShot({
							shotInCell: computerTargetInCel,
							boardToShots: computerBoardToShots,
						}))}
						        disabled={activePlayer !== playersName[1]}
						>
							STRZAŁ
						</Button>
					</Info>
				</InfoWrapper>
			</Content>
		</PlayGameWrapper>
	</Section>)
};