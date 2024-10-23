import {SettingsItem} from "./styled";
import {GameMode} from "./GameMode";
import {Ships} from "./Ships";
import {Shots} from "./Shots";
import {Additional} from "./Additional";
import {ArrowBackIcon, ArrowForwardIcon} from "../../../components/Icons";
import {ButtonsContainer, StyledLink} from "../../../components/Buttons";
import {Section} from "../../../components/Section";
import {
	selectGameMode, selectActivePlayer, setState, setActivePlayer, setShips, setNumberOfShots
} from "../shipGameSlice";
import {Difficulty} from "./Difficulty"
import {Header} from "../../../components/Header";
import {Wrapper} from "../../../components/Wrapper";
import {ConfirmationDialog} from "../../../components/ConfirmationDialog";
import {useAppDispatch, useAppSelector} from "../../../config/hooks";
import React from "react";

export const Settings = () => {
	const dispatch = useAppDispatch();
	const gameMode = useAppSelector(selectGameMode);
	const activePlayer = useAppSelector(selectActivePlayer);

	const onClickHandler = () => {
		sessionStorage.setItem("game", "true");
		dispatch(setShips());

		if (gameMode === "compVsComp") {
			dispatch(setState("playGame"));
			dispatch(setActivePlayer("firstPlayer"));
			dispatch(setNumberOfShots());
		}
	};

	return (<>
		{activePlayer && <ConfirmationDialog question={"Chcesz zakończyć ?"}/>}
		{!activePlayer && <Wrapper>
			<Section>
				<Header>
					Ustawienia gry
				</Header>
				<SettingsItem>
					<GameMode/>
					<Difficulty/>
					<Ships/>
					<Shots/>
					<Additional/>
				</SettingsItem>
				<ButtonsContainer>
					<StyledLink to="/home" onClick={() => dispatch(setState("home"))}><ArrowBackIcon/>Wstecz</StyledLink>
					<StyledLink
						to={gameMode === "compVsComp" ? "/playGame" : "/setShips"}
						onClick={onClickHandler}
						$animation
					>
						Dalej<ArrowForwardIcon/></StyledLink>
				</ButtonsContainer>
			</Section>
		</Wrapper>}
	</>);
};