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
import {FleetInfo} from "../../../components/FleetInfo/index.jsx"
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
							<FleetInfo fleet={firstPlayersFleet}/>
						</Info>

						<Info>
							<TargetDisplay>cell: {firstPlayerTargetInCel}</TargetDisplay>
							<Button
								onClick={() => dispatch(setShot({
									shotInCell: firstPlayerTargetInCel,
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
							<FleetInfo fleet={secondPlayerFleet}/>
						</Info>

						<Info>
							<TargetDisplay>cel: {secondPlayerTargetInCel}</TargetDisplay>
							<Button onClick={() => dispatch(setShot({
								shotInCell: secondPlayerTargetInCel,
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