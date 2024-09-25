import {useDispatch, useSelector} from "react-redux";
import {selectBonus, selectNumberOfShots, setParameters} from "../../../shipGameSlice.jsx";
import {AdditionalItem, InputRadio, InputRadioWrapper, InputsRadioContainer} from "../../styled.jsx";

export const Bonus = () => {
	const numberOfShots = useSelector(selectNumberOfShots)
	const bonus = useSelector(selectBonus);
	const dispatch = useDispatch();

	return (
		<AdditionalItem disabled={numberOfShots !== 1}
		>
			Strzelasz, aż nie trafisz:
			<InputsRadioContainer>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="bonus"
					            id="yesBonus"
					            value="yes"
					            checked={bonus}
					            onChange={() => dispatch(setParameters({bonus: !bonus}))}
					            disabled={numberOfShots !== 1}
					/>
					<label htmlFor="yesBonus">tak</label>
				</InputRadioWrapper>
				<InputRadioWrapper>
					<InputRadio type="radio"
					            name="bonus"
					            id="noBonus"
					            value="no"
					            checked={!bonus}
					            onChange={() => dispatch(setParameters({bonus: !bonus}))}
					            disabled={numberOfShots !== 1}
					/>
					<label htmlFor="noBonus">nie</label>
				</InputRadioWrapper>
			</InputsRadioContainer>
		</AdditionalItem>
	)
}