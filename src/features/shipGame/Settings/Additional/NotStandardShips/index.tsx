import {useAppDispatch, useAppSelector} from "../../../../../config/hooks";
import {selectNotStandardShips, setParameters} from "../../../shipGameSlice";
import {
	AdditionalItemWrapper,
	InputRadio,
	InputRadioWrapper,
	InputsRadioContainer,
	LabelInput
} from "../../styled";

export const NotStandardShips = () => {
	const notStandardShips = useAppSelector(selectNotStandardShips);
	const dispatch = useAppDispatch();

	return (
		<AdditionalItemWrapper>
			Statki niestandardowe:
			<InputsRadioContainer>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="notStandardShips"
					            id="yesNotStandardShips"
					            value="yes"
					            checked={notStandardShips}
					            onChange={() => dispatch(setParameters({notStandardShips: !notStandardShips}))}
					/>
					<LabelInput htmlFor="yesNotStandardShips">
						Tak
					</LabelInput>
				</InputRadioWrapper>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="notStandardShips"
					            id="noNotStandardShips"
					            value="no"
					            checked={!notStandardShips}
					            onChange={() => dispatch(setParameters({notStandardShips: !notStandardShips}))}
					/>
					<LabelInput htmlFor="noNotStandardShips">
						Nie
					</LabelInput>
				</InputRadioWrapper>
			</InputsRadioContainer>
		</AdditionalItemWrapper>
	);
};