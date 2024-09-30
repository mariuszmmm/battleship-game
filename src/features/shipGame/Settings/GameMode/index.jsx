import {Fieldset, Legend} from "../styled.jsx";
import {selectGameMode, setParameters} from "../../shipGameSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Button, ButtonsContainer} from "../../../../components/Buttons/index.jsx";
import {UserIcon, DesktopIcon} from "../../../../components/Icons/index.jsx";


export const GameMode = () => {
	const gameMode = useSelector(selectGameMode);
	const dispatch = useDispatch();

	const onChangeHandler = (gameMode) => {
		dispatch(setParameters({gameMode: gameMode}))
	};

	return (
		<Fieldset>
			<Legend>Tryb gry</Legend>
			<ButtonsContainer>
				<Button $active={gameMode === "compVsPlayer"}
				        onClick={() => onChangeHandler("compVsPlayer")}
				        $setting
				>
					<DesktopIcon $active={gameMode === "compVsPlayer"}/>
					<UserIcon $active={gameMode === "compVsPlayer"}/>
				</Button>
				<Button $active={gameMode === "compVsComp"}
				        onClick={() => onChangeHandler("compVsComp")}
				        $setting
				>
					<DesktopIcon $active={gameMode === "compVsComp"}/>
					<DesktopIcon $active={gameMode === "compVsComp"}/>
				</Button>
				<Button $active={gameMode === "playerVsPlayer"}
				        onClick={() => onChangeHandler("playerVsPlayer")}
				        $setting
				        disabled
				>
					<UserIcon $active={gameMode === "playerVsPlayer"} $disabled/>
					<UserIcon $active={gameMode === "playerVsPlayer"} $disabled/>
				</Button>
			</ButtonsContainer>
		</Fieldset>
	);
};