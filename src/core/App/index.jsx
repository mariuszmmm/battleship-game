import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {Example1Page} from "../../features/example1/Example1Page";
import {Play} from "../../features/play/Play";
import {Wrapper} from "./styled.jsx";
import {Navigation} from "./Navigation/index.jsx";
import {AboutPage} from "../../features/AboutPage";
import {Example1PageId} from "../../features/example1/Example1Page/Example1PageId";
import {Home} from "../../features/Home/index.jsx";

const App = () => {
	return (
		<HashRouter>
			{/*<Navigation/>*/}
			<Wrapper>
				<Routes>
					<Route path="/" element={<Home/>}/>
					{/*<Route path="/page1/:id" element={<Example1PageId/>}/>*/}
					<Route path="/play" element={<Play/>}/>
					<Route path="/page1" element={<Example1Page/>}/>
					<Route path="/about" element={<AboutPage/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</Wrapper>
		</HashRouter>
	);
};

export default App;