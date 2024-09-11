import {Section} from "../../../components/Section";
import {Content, Info, PlayGameWrapper, BoardsWrapper, InfoWrapper, TargetDisplay} from "./styled";
import {ShipsBoard} from "../../../components/ShipsBoard";
import {useDispatch, useSelector} from "react-redux";
import {
	selectActivePlayer,
	selectSecondPlayerBoard,
	selectSecondPlayerBoardToShots, selectSecondPlayerTarget,
	selectFirstPlayerBoard,
	selectFirstPlayerBoardToShots,
	selectFirstPlayerNumberOfShots, selectFirstPlayerTarget,
	setShips,
	setShot, selectSecondPlayerNumberOfShots, setActivePlayer,
	selectFirstPlayerFleet, selectSecondPlayerFleet
} from "../shipGameSlice.jsx"
import {Button, Exit} from "../../../components/Buttons/index.jsx";
import {X_markIcon} from "../../../components/Icons/index.jsx";
import {useEffect} from "react";

export const PlayGame = () => {
	const firstPlayerBoard = useSelector(selectFirstPlayerBoard)
	const firstPlayerBoardToShots = useSelector(selectFirstPlayerBoardToShots)
	const firstPlayerTargetInCel = useSelector(selectFirstPlayerTarget)
	const firstPlayerNumberOfShots = useSelector(selectFirstPlayerNumberOfShots)

	const secondPlayerBoard = useSelector(selectSecondPlayerBoard)
	const secondPlayerBoardToShots = useSelector(selectSecondPlayerBoardToShots)
	const secondPlayerTargetInCel = useSelector(selectSecondPlayerTarget)
	const secondPlayerNumberOfShots = useSelector(selectSecondPlayerNumberOfShots)
	const activePlayer = useSelector(selectActivePlayer);

	const dispatch = useDispatch();
	const playersName = ["firstPlayer", "secondPlayer"];
	const firstPlayersFleet = useSelector(selectFirstPlayerFleet);
	const secondPlayerFleet = useSelector(selectSecondPlayerFleet);

	useEffect(() => {
		dispatch(setActivePlayer("firstPlayer"))
	}, [])

	return (
		<Section>
			<PlayGameWrapper>
				<Exit to="/home" onClick={() => dispatch(setShips())}><X_markIcon/></Exit>
				<Content>
					<BoardsWrapper>
						<ShipsBoard board={firstPlayerBoardToShots}
						            player={playersName[0]}
						/>
						<ShipsBoard board={firstPlayerBoard}/>
						<ShipsBoard board={secondPlayerBoardToShots}
						            player={playersName[1]}
						/>
						<ShipsBoard board={secondPlayerBoard}/>
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
									// boardToShots: firstPlayerBoardToShots,
								}))}
								disabled={activePlayer !== playersName[0]}
							>
								STRZAŁ
							</Button>
						</Info>


						<Info>
							Ilość strzałów: <br/>

							{secondPlayerNumberOfShots}
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
							<TargetDisplay>namierzony: {secondPlayerTargetInCel}</TargetDisplay>
							<Button onClick={() => dispatch(setShot({
								shotInCell: secondPlayerTargetInCel,
								// boardToShots: secondPlayerBoardToShots,
							}))}
							        disabled={activePlayer !== playersName[1]}
							>
								STRZAŁ
							</Button>
						</Info>
					</InfoWrapper>
				</Content>
			</PlayGameWrapper>
		</Section>
	)
};