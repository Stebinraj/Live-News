import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BusinessNews from './pages/BusinessNews';
import EntertainmentNews from './pages/EntertainmentNews';
import HealthNews from './pages/HealthNews';
import ScienceNews from './pages/ScienceNews';
import SportsNews from './pages/SportsNews';
import TechnologyNews from './pages/TechnologyNews';
import SignUp from './components/Form/SignUp';
import Dashboard from './pages/Dashboard';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/business' element={<BusinessNews />}></Route>
            <Route path='/entertainment' element={<EntertainmentNews />}></Route>
            <Route path='/health' element={<HealthNews />}></Route>
            <Route path='/science' element={<ScienceNews />}></Route>
            <Route path='/sports' element={<SportsNews />}></Route>
            <Route path='/technology' element={<TechnologyNews />}></Route>
        </Routes>
    );
}

export default App;
