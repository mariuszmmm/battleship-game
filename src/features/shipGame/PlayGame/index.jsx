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
	selectPlayers,
	selectWinner,
	selectSound,
	selectState, setClearBoard
} from "../shipGameSlice.jsx"
import {Button} from "../../../components/Buttons";
import {FleetInfo} from "../../../components/FleetInfo"
import {useEffect, useRef} from "react";
import {Header} from "../../../components/Header/index.jsx";
import {Wrapper} from "../../../components/Wrapper/index.jsx";
import {GameResult} from "../../../components/GameResult/index.jsx";
import shotSound from "../../../assets/Audio/shot.mp3"
import seaWaves from "../../../assets/Audio/seaWaves.mp3"
import {useNavigate} from "react-router-dom";

export const PlayGame = () => {
	const firstPlayerBoard = useSelector(selectFirstPlayerBoard);
	const firstPlayerBoardToShots = useSelector(selectFirstPlayerBoardToShots);
	const firstPlayerTargetInCell = useSelector(selectFirstPlayerTarget);
	const firstPlayerNumberOfShots = useSelector(selectFirstPlayerNumberOfShots);
	const activePlayer = useSelector(selectActivePlayer);
	const target = useSelector(selectFirstPlayerTarget);
	const shotInCell = useSelector(selectFirstPlayerShotInCell);
	const players = useSelector(selectPlayers);
	const winner = useSelector(selectWinner);
	const dispatch = useDispatch();
	const sound = useSelector(selectSound);
	const playersName = ["firstPlayer", "secondPlayer"];
	const audioRef = useRef(null);
	const navigate = useNavigate();
	const state = useSelector(selectState);

	useEffect(() => {
		const handleBeforeUnload = (event) => {
			event.preventDefault();
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		if (state !== "playGame") {
			dispatch(setClearBoard());
			navigate("/home", {replace: true});
		}

		audioRef.current = new Audio(seaWaves);
		if (sound) {
			audioRef.current.play();
			audioRef.current.loop = true;
			audioRef.current.volume = 0.3;
		}

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
			sound && audioRef.current.pause();
		};
	}, [state]);

	const onShot = () => {
		dispatch(setShot({
			shotInCell: firstPlayerTargetInCell, player: activePlayer
		}));
		if (sound) {
			const audio = new Audio(shotSound)
			audio.play();
		}
	};

	return (<>
		{winner && <GameResult/>}
		<Wrapper>
			<Section>
				<Header>
					{activePlayer === "firstPlayer" ? players === "compVsComp" ? "Ruch pierwszego komputera" : "Twój ruch" : players === "compVsComp" ? "Ruch drugiego komputera" : "Ruch drugiego gracza"}
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
								<span>Strzały: {firstPlayerNumberOfShots}</span>
								<span>Cel: {firstPlayerTargetInCell}</span>
							</InfoMain>
							<p>Statki przeciwnika</p>
							<FleetInfo/>
						</Info>
						<Button
							onClick={onShot}
							disabled={activePlayer !== playersName[0] || !target || (target && shotInCell) || players === "compVsComp"}
							$shot
							$animation={target}
						>
							STRZAŁ
						</Button>
					</InfoWrapper>
				</Content>
			</Section>
		</Wrapper>
	</>);
};