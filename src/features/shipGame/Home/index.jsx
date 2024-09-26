import {Content, HomeWrapper, Image} from "./styled.jsx";
import shipsImage from "../../../assets/Images/ships.png";
import {StyledLink} from "../../../components/Buttons";
import {useDispatch} from "react-redux";
import {setClearBoard, setState} from "../shipGameSlice.jsx"
import {useEffect} from "react";

export const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setClearBoard());
	}, []);

	return (
		<HomeWrapper>
			<Content>
				<Image src={shipsImage} alt="logo"/>
				<StyledLink
					to="/settings" onClick={() => dispatch(setState("settings"))}
					$animation
				>
					Rozpocznij
				</StyledLink>
			</Content>
		</HomeWrapper>
	);
};