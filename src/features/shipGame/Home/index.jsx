import {Content, HomeWrapper, Image} from "./styled.jsx";
import shipsImage from "../../../assets/Images/ships.png";
import {StyledLink} from "../../../components/Buttons";

export const Home = () => (
	<HomeWrapper>
		<Content>
			<Image src={shipsImage} alt="logo"/>
			<StyledLink to="/settings" $animation>
				Rozpocznij
			</StyledLink>
		</Content>
	</HomeWrapper>
);