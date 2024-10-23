import {Section} from "../../../components/Section";
import {Content, Info, BoardsWrapper, InfoWrapper, InfoMain} from "./styled";
import {ShipsBoard} from "../../../components/ShipsBoard";
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
	selectSecondPlayerNumberOfShots,
	selectSecondPlayerTarget,
	selectSecondPlayerFleet,
	selectFirstPlayerFleet,
} from "../shipGameSlice"
import {Button} from "../../../components/Buttons";
import {FleetInfo} from "../../../components/FleetInfo"
import {useEffect, useRef, useState} from "react";
import {Header} from "../../../components/Header";
import {Wrapper} from "../../../components/Wrapper";
import {GameResult} from "../../../components/GameResult";
import shotSound from "../../../assets/Audio/shot.mp3"
import seaWaves from "../../../assets/Audio/seaWaves.mp3"
import {useNavigate} from "react-router-dom";
import {useHandleBeforeUnload} from "../../../utils/useHandleBeforeUnload";
import {useHandleRotateScreen} from "../../../utils/useHandleRotateScreen";
import {RotateScreenInfo} from "../../../components/RotateScreenInfo";
import {useAppDispatch, useAppSelector} from "../../../config/hooks";
import {CellId, Fleet} from "../../../types/types";

export const PlayGame = () => {
	const firstPlayerBoard = useAppSelector(selectFirstPlayerBoard);
	const firstPlayerBoardToShots = useAppSelector(selectFirstPlayerBoardToShots);
	const firstPlayerNumberOfShots = useAppSelector(selectFirstPlayerNumberOfShots);
	const secondPlayerNumberOfShots = useAppSelector(selectSecondPlayerNumberOfShots);
	const firstPlayerFleet = useAppSelector(selectFirstPlayerFleet) as Fleet;
	const secondPlayerFleet = useAppSelector(selectSecondPlayerFleet) as Fleet;
	const firstPlayerTarget = useAppSelector(selectFirstPlayerTarget) as CellId;
	const secondPlayerTarget = useAppSelector(selectSecondPlayerTarget) as CellId;
	const activePlayer = useAppSelector(selectActivePlayer);
	const shotInCell = useAppSelector(selectFirstPlayerShotInCell);
	const gameMode = useAppSelector(selectGameMode);
	const winner = useAppSelector(selectWinner);
	const dispatch = useAppDispatch();
	const sound = useAppSelector(selectSound);
	const playersName = ["firstPlayer", "secondPlayer"] as const;
	const navigate = useNavigate();
	const audioRef = useRef(new Audio(seaWaves));
	const [targetInfo, setTargetInfo] = useState<CellId | "">("");

	useEffect(() => {
		const storage = sessionStorage.getItem("game");
		const audioElement = audioRef.current;

		if (!storage) {
			navigate("/", {replace: true});
			return
		} else {
			if (sound && audioElement) {
				audioElement.loop = true;
				audioElement.volume = .05;
				audioElement && audioElement.play()
			}
		}

		return () => {
			sound && audioElement.pause()
		};
	}, [navigate, sound]);

	useEffect(() => {
		if (activePlayer === "firstPlayer") {
			firstPlayerTarget && setTargetInfo(firstPlayerTarget)
		} else {
			secondPlayerTarget && setTargetInfo(secondPlayerTarget)
		}
	}, [activePlayer, firstPlayerTarget, secondPlayerTarget]);

	useEffect(() => {
		setTargetInfo("")
	}, [activePlayer]);

	const onShot = () => {
		if (!shotInCell) setTargetInfo(firstPlayerTarget);
		if (sound) {
			const audio = new Audio(shotSound);
			audio.volume = 0.1;
			audio && audio.play();
		}
		dispatch(setShot({shotInCell: firstPlayerTarget, player: activePlayer}));
	};

	useHandleBeforeUnload();
	const turn = useHandleRotateScreen();

	return <>
		{winner && <GameResult/>}
		{activePlayer &&
			<Wrapper>
				{turn ? <RotateScreenInfo/> :
					<Section>
						<Header>
							{activePlayer === "firstPlayer" ? "Ruch pierwszego gracza" : "Ruch drugiego gracza"}
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
										<span>Strzały: {activePlayer === "firstPlayer" ? firstPlayerNumberOfShots : secondPlayerNumberOfShots}</span>
										<span>Cel: {targetInfo}</span>
									</InfoMain>
									<p>
										{activePlayer === "firstPlayer" ? "Statki drugiego gracza" : "Statki pierwszego gracza"}
									</p>
									<FleetInfo fleet={activePlayer === "firstPlayer" ? secondPlayerFleet : firstPlayerFleet}/>
								</Info>
								<Button
									onClick={onShot}
									disabled={activePlayer !== playersName[0] || !firstPlayerTarget || !!shotInCell || gameMode === "compVsComp"}
									$shot
									$animation={!!firstPlayerTarget && !winner && !shotInCell}
								>
									STRZAŁ
								</Button>
							</InfoWrapper>
						</Content>
					</Section>
				}
			</Wrapper>
		}
	</>;
};