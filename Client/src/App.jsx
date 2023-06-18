// Import styles;
import './App.css';
// Import utilities;
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// Import components;
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import CreateForm from './components/CreateForm/CreateForm';
import About from './components/About/About';
// Import actions;
import { getDiets, getRecipes } from './redux/actions';
import FiltersBar from './components/FiltersBar/FiltersBar';
import Search from './components/Search/Search';

const App = () => {
  // create const to use with each hook 
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  // //craate access const in order to determine whether or not you can log in
  // const [access, setAccess] = useState(false);
  // // mount useEffect that asks for the access value and depending on that give permission or not to advance in the page
  // useEffect(() => {
  //   access ? navigate('/home') : navigate('/');
  // }, [access]);
  // // function that analyzes if the entered user is valid or not
  // const login = async (userData) => {
  //   try {
  //     const { email, password } = userData;
  //     const { data } = await axios(`/login?email=${email}&password=${password}`);
  //     setAccess(data.access)
  //   } catch (error) {
  //     window.alert('Invalid email or password');
  //   }
  // };
  // // function that logs out the user
  // const logout = async () => {
  //   setAccess(false);
  // };

  // mount useEffect that creates the main arrays with which the application works
  useEffect(() => {
    navigate('/');
    dispatch(getRecipes());
    dispatch(getDiets());
  }, []);

  // rendering of the different components with their proper routing
  return (
    <div className="App">
      { location.pathname !== '/' && <NavBar /> }
      { location.pathname === '/home' && <FiltersBar /> }
      <Routes>
        <Route path="/" element={ <LandingPage /> } />
        <Route path='/home' element={<Cards />} />
        <Route path='/search/:name' element={<Search />} />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/create' element={<CreateForm />} />
      </Routes>
    </div>
  );
};

export default App;
