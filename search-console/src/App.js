import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBord from './components/Dashboard/Dashboard';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/dashboard' element={<DashBord/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
