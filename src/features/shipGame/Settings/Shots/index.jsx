import {Fieldset, Legend} from "../styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectNumberOfShips, selectNumberOfShots, selectShotsEqualShips, setParameters} from "../../shipGameSlice.jsx";
import {Button, ButtonsContainer} from "../../../../components/Buttons/index.jsx";

export const Shots = () => {
		const numberOfShips = useSelector(selectNumberOfShips)
		const numberOfShots = useSelector(selectNumberOfShots);
		const shotsEqualShips = useSelector(selectShotsEqualShips)
		const dispatch = useDispatch();

		const onClickHandler = (shots) => {
			if (shots === "ships") {
				dispatch(setParameters(
					{shotsEqualShips: true, numberOfShots: numberOfShips}
				));
			} else {
				dispatch(setParameters(
					{shotsEqualShips: false, numberOfShots: shots}
				));
			}

			if (shots !== 1) {
				dispatch(setParameters(
					{bonus: false}
				));
			}
		};

		return (
			<Fieldset>
				<Legend>Strzały</Legend>
				<ButtonsContainer>
					<Button
						$active={numberOfShots === 1}
						onClick={() => onClickHandler(1)}
						$setting
					>
						1
					</Button>
					<Button
						$active={numberOfShots === 3}
						onClick={() => onClickHandler(3)}
						$setting
					>
						3
					</Button>
					<Button
						$active={shotsEqualShips}
						onClick={() => onClickHandler("ships")}
						$setting
					>
						= statki
					</Button>
				</ButtonsContainer>
			</Fieldset>
		)
	}
;