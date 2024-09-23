import {Fieldset, Legend} from "../styled.jsx";
import {Button, ButtonsContainer} from "../../../../components/Buttons/index.jsx";
import {selectDifficultyLevel, setParameters} from "../../shipGameSlice.jsx";
import {useDispatch, useSelector} from "react-redux";

export const Difficulty = () => {
	const difficultyLevel = useSelector(selectDifficultyLevel);
	const dispatch = useDispatch();

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
	)
}