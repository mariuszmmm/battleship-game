import {
	AdditionalItem, InputRadio, InputRadioWrapper,
	InputsRadioContainer, LabelInput
} from "../../styled";
import {selectMayTouch, setParameters} from "../../../shipGameSlice";
import {useAppDispatch, useAppSelector} from "../../../../../config/hooks";

export const MayTouch = () => {
	const mayTouch = useAppSelector(selectMayTouch);
	const dispatch = useAppDispatch();

	return (
		<AdditionalItem>
			Statki mogą się stykać :
			<InputsRadioContainer>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="contact"
					            id="yesContact"
					            value="yes"
					            checked={mayTouch}
					            onChange={() => dispatch(setParameters({mayTouch: !mayTouch}))}
					/>
					<LabelInput htmlFor="yesContact">Tak</LabelInput>
				</InputRadioWrapper>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="contact"
					            id="noContact"
					            value="no"
					            checked={!mayTouch}
					            onChange={() => dispatch(setParameters({mayTouch: !mayTouch}))}
					/>
					<LabelInput htmlFor="noContact">Nie</LabelInput>
				</InputRadioWrapper>
			</InputsRadioContainer>
		</AdditionalItem>
	);
};