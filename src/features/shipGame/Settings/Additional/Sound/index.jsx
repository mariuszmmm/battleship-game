import {AdditionalItem, InputRadio, InputRadioWrapper, InputsRadioContainer} from "../../styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectSound, setParameters} from "../../../shipGameSlice.jsx";

export const Sound = () => {
	const sound = useSelector(selectSound);
	const dispatch = useDispatch();

	const onChangeHandler = ({target}) => {
		const soundValue = target.value;
		if (soundValue) {
			dispatch(setParameters({sound: !sound}));
		}
	};

	return (
		<AdditionalItem>

			Dźwięk :
			<InputsRadioContainer>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="sound"
					            id="yes"
					            value="yes"
					            checked={sound}
					            onChange={onChangeHandler}
					/>
					<label htmlFor="yes">tak</label>
				</InputRadioWrapper>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="sound"
					            id="no"
					            value="no"
					            checked={!sound}
					            onChange={onChangeHandler}
					/>
					<label htmlFor="no">nie</label>
				</InputRadioWrapper>
			</InputsRadioContainer>
		</AdditionalItem>
	)
}