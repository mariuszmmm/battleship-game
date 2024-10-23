import {Fieldset, Legend} from "../styled";
import {Button, ButtonsContainer} from "../../../../components/Buttons";
import {selectDifficultyLevel, setParameters} from "../../shipGameSlice";
import {useAppDispatch, useAppSelector} from "../../../../config/hooks";

export const Difficulty = () => {
	const difficultyLevel = useAppSelector(selectDifficultyLevel);
	const dispatch = useAppDispatch();

	return (
		<Fieldset>
			<Legend>Poziom trudności</Legend>
			<ButtonsContainer>
				<Button
					$active={difficultyLevel === "easy"}
					onClick={() => dispatch(setParameters({difficultyLevel: "easy"}))}
					$setting
				>
					Łatwy
				</Button>
				<Button
					$active={difficultyLevel === "medium"}
					onClick={() => dispatch(setParameters({difficultyLevel: "medium"}))}
					$setting
				>
					Średni
				</Button>
				<Button
					$active={difficultyLevel === "difficult"}
					onClick={() => dispatch(setParameters({difficultyLevel: "difficult"}))}
					$setting
				>
					Trudny
				</Button>
			</ButtonsContainer>
		</Fieldset>
	);
};