import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {ScrollToTop} from "./ScrollToTop"
import {Home} from "../../features/shipGame/Home";
import {Settings} from "../../features/shipGame/Settings";
import {SetShips} from "../../features/shipGame/SetShips";
import {PlayGame} from "../../features/shipGame/PlayGame";

const App = () => {
	return (
		<HashRouter>
			<ScrollToTop/>
			<Routes>
				<Route path="/home" element={<Home/>}/>
				<Route path="/settings" element={<Settings/>}/>
				<Route path="/setShips" element={<SetShips/>}/>
				<Route path="/playGame" element={<PlayGame/>}/>
				<Route path="*" element={<Navigate to="/home"/>}/>
			</Routes>
		</HashRouter>
	);
};

export default App;