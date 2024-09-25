import {AdditionalItem, InputRadio, InputRadioWrapper, InputsRadioContainer} from "../../styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectSound, setParameters} from "../../../shipGameSlice.jsx";

export const Sound = () => {
	const sound = useSelector(selectSound);
	const dispatch = useDispatch();

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
					<label htmlFor="yesSound">tak</label>
				</InputRadioWrapper>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="sound"
					            id="noSound"
					            value="no"
					            checked={!sound}
					            onChange={() => dispatch(setParameters({sound: !sound}))}
					/>
					<label htmlFor="noSound">nie</label>
				</InputRadioWrapper>
			</InputsRadioContainer>
		</AdditionalItem>
	)
}