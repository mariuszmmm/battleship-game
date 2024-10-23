import {
	AdditionalItem, InputRadio, InputRadioWrapper,
	InputsRadioContainer, LabelInput
} from "../../styled";
import {selectSound, setParameters} from "../../../shipGameSlice";
import {useAppDispatch, useAppSelector} from "../../../../../config/hooks";

export const Sound = () => {
	const sound = useAppSelector(selectSound);
	const dispatch = useAppDispatch();

	return (
		<AdditionalItem>
			Dźwięk :
			<InputsRadioContainer>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="sound"
					            id="yesSound"
					            value="yes"
					            checked={sound}
					            onChange={() => dispatch(setParameters({sound: !sound}))}
					/>
					<LabelInput htmlFor="yesSound">Tak</LabelInput>
				</InputRadioWrapper>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="sound"
					            id="noSound"
					            value="no"
					            checked={!sound}
					            onChange={() => dispatch(setParameters({sound: !sound}))}
					/>
					<LabelInput htmlFor="noSound">Nie</LabelInput>
				</InputRadioWrapper>
			</InputsRadioContainer>
		</AdditionalItem>
	);
};