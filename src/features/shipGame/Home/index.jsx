import {Content, HomeWrapper, Image} from "./styled.jsx";
import shipsImage from "../../../assets/Images/ships.png";
import {StyledLink} from "../../../components/Buttons";
import {useEffect} from "react";

export const Home = () => {
	useEffect(() => {
		sessionStorage.removeItem("playGame")
	}, []);

	return (
		<HomeWrapper>
			<Content>
				<Image src={shipsImage} alt="logo"/>
				<StyledLink to="/settings" $animation>
					Rozpocznij
				</StyledLink>
			</Content>
		</HomeWrapper>
	);
};