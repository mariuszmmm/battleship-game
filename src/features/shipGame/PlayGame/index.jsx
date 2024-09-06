import {Section} from "../../../components/Section";
import {Content, Info, PlayGameWrapper, BoardsWrapper, InfoWrapper} from "./styled";
import {ShipsBoard} from "../../../components/ShipsBoard";
import {useDispatch, useSelector} from "react-redux";
import {
	selectFirstPlayerBoard, selectFirstPlayerBoardToShots, selectFirstPlayerFleet, selectShots, setSettingsState
} from "../shipGameSlice.jsx"
import {Back} from "../../../components/Buttons/index.jsx";
import {ArrowBackIcon} from "../../../components/Icons/index.jsx";

export const PlayGame = () => {
	const board = useSelector(selectFirstPlayerBoard)
	const boardToShots = useSelector(selectFirstPlayerBoardToShots)
	const dispatch = useDispatch();
	const shots = useSelector(selectShots);
	const fleet = useSelector(selectFirstPlayerFleet);
	console.log(fleet);

	return (<Section>
		<PlayGameWrapper>
			<Back to="/setShips" onClick={() => dispatch(setSettingsState())}><ArrowBackIcon/></Back>
			<Content>
				<BoardsWrapper>
					<ShipsBoard board={boardToShots}/>
					<ShipsBoard board={board}/>
				</BoardsWrapper>
				<InfoWrapper>
					<Info>
						Ilość strzałów: <br/>
						{shots.number}
					</Info>
					<Info>
						Ilość pozostałych statków: <br/>
						<ul>
							<li>1 x czteromasztowiec</li>
							<li>2 x trzymasztowce</li>
							<li>3 x dwumasztowce</li>
							<li>4 x jednomasztowce</li>
						</ul>
					</Info>
				</InfoWrapper>
			</Content>


		</PlayGameWrapper>
	</Section>)
};