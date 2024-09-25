import {AdditionalItem, InputRadio, InputRadioWrapper, InputsRadioContainer} from "../../styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectMayTouch, setParameters} from "../../../shipGameSlice.jsx";

export const MayTouch = () => {
	const mayTouch = useSelector(selectMayTouch);
	const dispatch = useDispatch();

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
					<label htmlFor="yesContact">tak</label>
				</InputRadioWrapper>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="contact"
					            id="noContact"
					            value="no"
					            checked={!mayTouch}
					            onChange={() => dispatch(setParameters({mayTouch: !mayTouch}))}
					/>
					<label htmlFor="noContact">nie</label>
				</InputRadioWrapper>
			</InputsRadioContainer>
		</AdditionalItem>
	)
}