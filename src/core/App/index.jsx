import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {Play} from "../../features/play/Play";
import {Wrapper} from "./styled.jsx";
import {Home} from "../../features/Home/index.jsx";

const App = () => {
	return (
		<HashRouter>
			<Wrapper>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/play" element={<Play/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</Wrapper>
		</HashRouter>
	);
};

export default App;