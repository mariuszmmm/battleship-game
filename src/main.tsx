import {createRoot} from 'react-dom/client'
import App from './core/App'
import {Provider} from "react-redux";
import {store} from "./config/store";
import {ThemeProvider} from "styled-components";
import {Normalize} from "styled-normalize";
import GlobalStyle from "./core/GlobalStyle";
import {theme} from "./config/theme";

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<Normalize/>
			<GlobalStyle/>
			<App/>
		</ThemeProvider>
	</Provider>
);