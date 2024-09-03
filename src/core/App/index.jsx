import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {ScrollToTop} from "./ScrollToTop/index.jsx"
import {Home} from "../../features/shipGame/Home/index.jsx";
import {Settings} from "../../features/shipGame/Settings/index.jsx";
import {ChangeShips} from "../../features/shipGame/ChangeShips/index.jsx";


const App = () => {
	return (
		<HashRouter>
			<ScrollToTop/>
			<Routes>
				<Route path="/home" element={<Home/>}/>
				<Route path="/settings" element={<Settings/>}/>
				<Route path="/changesShips" element={<ChangeShips/>}/>
				<Route path="*" element={<Navigate to="/home"/>}/>
			</Routes>
		</HashRouter>
	);
};

export default App;