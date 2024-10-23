import {Fieldset, Legend} from "../styled";
import {selectNumberOfShips, selectNumberOfShots, selectShotsEqualShips, setParameters} from "../../shipGameSlice";
import {Button, ButtonsContainer} from "../../../../components/Buttons";
import {useAppDispatch, useAppSelector} from "../../../../config/hooks";
import {Parameters} from "../../../../types/types";

export const Shots = () => {
	const numberOfShips = useAppSelector(selectNumberOfShips)
	const numberOfShots = useAppSelector(selectNumberOfShots);
	const shotsEqualShips = useAppSelector(selectShotsEqualShips)
	const dispatch = useAppDispatch();

	const onClickHandler = (shots: Parameters["numberOfShots"]) => {
		if (numberOfShips === shots) {
			dispatch(setParameters({shotsEqualShips: true, numberOfShots: shots}))
		} else {
			dispatch(setParameters({shotsEqualShips: false, numberOfShots: shots}))
		}

		shots !== 1 && dispatch(setParameters({bonus: false}));
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
					onClick={() => onClickHandler(numberOfShips)}
					$setting
				>
					= statki
				</Button>
			</ButtonsContainer>
		</Fieldset>
	);
};