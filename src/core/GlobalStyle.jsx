import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
		    
        ::-webkit-scrollbar {
            width: 1vw;
		        min-width: 6px;
        }

        ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.7);
        }

        ::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 50px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.5);
        }
    }

    *, ::after, ::before {
        box-sizing: inherit;
    }

    body {
        font-family: "Roboto", sans-serif;
        overflow-y: scroll;
		    user-select: none;
    }
`;

export default GlobalStyle;