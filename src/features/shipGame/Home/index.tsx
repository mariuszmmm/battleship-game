import {useEffect} from "react";
import {Content, HomeWrapper, Image} from "./styled";
import shipsImage from "../../../assets/Images/ships.png";
import {StyledLink} from "../../../components/Buttons";

export const Home = () => {
	useEffect(() => {
		sessionStorage.removeItem("game")
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