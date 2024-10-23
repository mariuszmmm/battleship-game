import {Fieldset, Legend} from "../styled";
import {selectGameMode, setParameters} from "../../shipGameSlice";
import {Button, ButtonsContainer} from "../../../../components/Buttons";
import {UserIcon, DesktopIcon} from "../../../../components/Icons";
import {useAppDispatch, useAppSelector} from "../../../../config/hooks";
import {Parameters} from "../../../../types/types";


export const GameMode = () => {
	const gameMode = useAppSelector(selectGameMode);
	const dispatch = useAppDispatch();

	const onChangeHandler = (gameMode: Parameters["gameMode"]) => {
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