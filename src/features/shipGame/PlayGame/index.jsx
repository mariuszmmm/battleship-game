import {Section} from "../../../components/Section";
import {Content, Info, BoardsWrapper, InfoWrapper, InfoMain} from "./styled";
import {ShipsBoard} from "../../../components/ShipsBoard";
import {useDispatch, useSelector} from "react-redux";
import {
	selectActivePlayer,
	selectFirstPlayerBoard,
	selectFirstPlayerBoardToShots,
	selectFirstPlayerNumberOfShots,
	selectFirstPlayerTarget,
	setShot,
	selectFirstPlayerShotInCell,
	selectGameMode,
	selectWinner,
	selectSound,
} from "../shipGameSlice.jsx"
import {Button} from "../../../components/Buttons";
import {FleetInfo} from "../../../components/FleetInfo"
import {useEffect, useRef, useState} from "react";
import {Header} from "../../../components/Header/index.jsx";
import {Wrapper} from "../../../components/Wrapper/index.jsx";
import {GameResult} from "../../../components/GameResult/index.jsx";
import shotSound from "../../../assets/Audio/shot.mp3"
import seaWaves from "../../../assets/Audio/seaWaves.mp3"

export const PlayGame = () => {
	const firstPlayerBoard = useSelector(selectFirstPlayerBoard);
	const firstPlayerBoardToShots = useSelector(selectFirstPlayerBoardToShots);
	const numberOfShots = useSelector(selectFirstPlayerNumberOfShots);
	const activePlayer = useSelector(selectActivePlayer);
	const target = useSelector(selectFirstPlayerTarget);
	const shotInCell = useSelector(selectFirstPlayerShotInCell);
	const gameMode = useSelector(selectGameMode);
	const winner = useSelector(selectWinner);
	const dispatch = useDispatch();
	const sound = useSelector(selectSound);
	const playersName = ["firstPlayer", "secondPlayer"];
	const audioRef = useRef(null);
	const [targetInfo, setTargetInfo] = useState(target);

	useEffect(() => {
		audioRef.current = new Audio(seaWaves);
		if (sound) {
			audioRef.current.play();
			audioRef.current.loop = true;
			audioRef.current.volume = 0.3;
		}

		return () => sound && audioRef.current.pause();
	}, []);

	useEffect(() => {
		if (activePlayer !== "firstPlayer") setTargetInfo("")
	}, [activePlayer]);

	const onShot = () => {
		if (!shotInCell) setTargetInfo(target);
		dispatch(setShot({
			shotInCell: target, player: activePlayer
		}));
		if (sound) {
			const audio = new Audio(shotSound)
			audio.play();
		}
	};

	return (<>
		{winner && <GameResult/>}
		{activePlayer &&
			<Wrapper>
				<Section>
					<Header>
						{activePlayer === "firstPlayer" ? gameMode === "compVsComp" ? "Ruch pierwszego komputera" : "Twój ruch" : gameMode === "compVsComp" ? "Ruch drugiego komputera" : "Ruch drugiego gracza"}
					</Header>
					<Content>
						<BoardsWrapper>
							<ShipsBoard board={firstPlayerBoardToShots}
							            player={playersName[0]}
							            toLeft={activePlayer === "secondPlayer"}
							/>
							<ShipsBoard board={firstPlayerBoard}
							            toLeft={activePlayer === "secondPlayer"}
							/>
						</BoardsWrapper>
						<InfoWrapper>
							<Info>
								<InfoMain>
									<span>Strzały: {numberOfShots}</span>
									<span>Cel: {target || activePlayer !== "firstPlayer" ? target : targetInfo}</span>
								</InfoMain>
								<p>Statki przeciwnika</p>
								<FleetInfo/>
							</Info>
							<Button
								onClick={onShot}
								disabled={activePlayer !== playersName[0] || !target || (target && shotInCell) || gameMode === "compVsComp"}
								$shot
								$animation={target}
							>
								STRZAŁ
							</Button>
						</InfoWrapper>
					</Content>
				</Section>
			</Wrapper>
		}
	</>);
};