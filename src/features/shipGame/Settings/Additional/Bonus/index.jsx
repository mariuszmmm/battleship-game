import {useDispatch, useSelector} from "react-redux";
import {selectBonus, selectNumberOfShots, setParameters} from "../../../shipGameSlice.jsx";
import {
	AdditionalItem, InputRadio, InputRadioWrapper,
	InputsRadioContainer, LabelInput
} from "../../styled.jsx";

export const Bonus = () => {
	const numberOfShots = useSelector(selectNumberOfShots);
	const bonus = useSelector(selectBonus);
	const dispatch = useDispatch();

	return (
		<AdditionalItem disabled={numberOfShots !== "1"}
		>
			Strzelasz, aż nie trafisz:
			<InputsRadioContainer>
				<InputRadioWrapper disabled={numberOfShots !== "1"}>
					<InputRadio type="radio"
					            name="bonus"
					            id="yesBonus"
					            value="yes"
					            checked={bonus}
					            onChange={() => dispatch(setParameters({bonus: !bonus}))}
					            disabled={numberOfShots !== "1"}
					/>
					<LabelInput htmlFor="yesBonus" disabled={numberOfShots !== "1"}>
						Tak
					</LabelInput>
				</InputRadioWrapper>
				<InputRadioWrapper disabled={numberOfShots !== "1"}>
					<InputRadio type="radio"
					            name="bonus"
					            id="noBonus"
					            value="no"
					            checked={!bonus}
					            onChange={() => dispatch(setParameters({bonus: !bonus}))}
					            disabled={numberOfShots !== "1"}
					/>
					<LabelInput htmlFor="noBonus" disabled={numberOfShots !== "1"}>
						Nie
					</LabelInput>
				</InputRadioWrapper>
			</InputsRadioContainer>
		</AdditionalItem>
	);
};