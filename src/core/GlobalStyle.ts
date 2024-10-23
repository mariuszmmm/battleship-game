import {createGlobalStyle} from "styled-components";
import {rgba} from "polished";

const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
		
		::-webkit-scrollbar {
			width: 1vw;
			min-width: 6px;
		}
		
		::-webkit-scrollbar-track {
			background-color: ${({theme}) => rgba(theme.colors.primaryColor, 0.7)};
		}
		
		::-webkit-scrollbar-thumb {
			background-color: ${({theme}) => rgba(theme.colors.primaryColor, 0.3)};
			border-radius: 5px;
		}
		
		::-webkit-scrollbar-thumb:hover {
			background-color: ${({theme}) => rgba(theme.colors.primaryColor, 0.5)};
		}
	}
	
	*, ::after, ::before {
		box-sizing: inherit;
	}
	
	body {
		font-family: "Roboto", sans-serif;
		overflow-y: scroll;
		user-select: none;
		width: 100%;
		margin: 0 auto;
	}
`;

export default GlobalStyle;