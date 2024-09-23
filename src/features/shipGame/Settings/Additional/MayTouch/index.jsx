import {AdditionalItem, InputRadio, InputRadioWrapper, InputsRadioContainer} from "../../styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectMayTouch, setParameters} from "../../../shipGameSlice.jsx";

export const MayTouch = () => {
	const mayTouch = useSelector(selectMayTouch);
	const dispatch = useDispatch();

	const onChangeHandler = ({target}) => {
		const mayTouchValue = target.value;
		if (mayTouchValue) {
			dispatch(setParameters({mayTouch: !mayTouch}));
		}
	};

	return (
		<AdditionalItem>
			Statki mogą się stykać :
			<InputsRadioContainer>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="contact"
					            id="yes"
					            value="yes"
					            checked={mayTouch}
					            onChange={onChangeHandler}
					/>
					<label htmlFor="yes">tak</label>
				</InputRadioWrapper>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="contact"
					            id="no"
					            value="no"
					            checked={!mayTouch}
					            onChange={onChangeHandler}
					/>
					<label htmlFor="no">nie</label>
				</InputRadioWrapper>
			</InputsRadioContainer>
		</AdditionalItem>
	)
}