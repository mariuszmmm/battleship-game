import {Fieldset, Legend} from "../styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectNumberOfShips, selectNumberOfShots, setParameters} from "../../shipGameSlice.jsx";
import {Button, ButtonsContainer} from "../../../../components/Buttons/index.jsx";

export const Shots = () => {
		const numberOfShots = useSelector(selectNumberOfShots);
		const numberOfShips = useSelector(selectNumberOfShips);
		const dispatch = useDispatch();

		const onClickHandler = (number) => {
			dispatch(setParameters({numberOfShots: number}))
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
						$active={numberOfShots === numberOfShips}
						onClick={() => onClickHandler(numberOfShips)}
						$setting
					>
						= statki
					</Button>
				</ButtonsContainer>
			</Fieldset>
		)
	}
;