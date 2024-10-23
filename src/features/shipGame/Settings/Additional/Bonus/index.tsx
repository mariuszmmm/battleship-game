import {selectBonus, selectNumberOfShots, setParameters} from "../../../shipGameSlice";
import {
	AdditionalItemWrapper, InputRadio, InputRadioWrapper,
	InputsRadioContainer, LabelInput
} from "../../styled";
import {useAppDispatch, useAppSelector} from "../../../../../config/hooks";

export const Bonus = () => {
	const numberOfShots = useAppSelector(selectNumberOfShots);
	const bonus = useAppSelector(selectBonus);
	const dispatch = useAppDispatch();

	return (
		<AdditionalItemWrapper disabled={numberOfShots !== 1}
		>
			Strzelasz, aż nie trafisz:
			<InputsRadioContainer>
				<InputRadioWrapper disabled={numberOfShots !== 1}>
					<InputRadio type="radio"
					            name="bonus"
					            id="yesBonus"
					            value="yes"
					            checked={bonus}
					            onChange={() => dispatch(setParameters({bonus: !bonus}))}
					            disabled={numberOfShots !== 1}
					/>
					<LabelInput htmlFor="yesBonus" disabled={numberOfShots !== 1}>
						Tak
					</LabelInput>
				</InputRadioWrapper>
				<InputRadioWrapper disabled={numberOfShots !== 1}>
					<InputRadio type="radio"
					            name="bonus"
					            id="noBonus"
					            value="no"
					            checked={!bonus}
					            onChange={() => dispatch(setParameters({bonus: !bonus}))}
					            disabled={numberOfShots !== 1}
					/>
					<LabelInput htmlFor="noBonus" disabled={numberOfShots !== 1}>
						Nie
					</LabelInput>
				</InputRadioWrapper>
			</InputsRadioContainer>
		</AdditionalItemWrapper>
	);
};