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
import Search from './components/Search/Search';
import FiltersBar from './components/FiltersBar/FiltersBar';
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import CreateForm from './components/CreateForm/CreateForm';
import UpdateForm from './components/UpdateForm/UptadeForm';
import About from './components/About/About';
// Import actions;
import { getDiets, getRecipes } from './redux/actions';

const App = () => {
  // create const to use with each hook 
  const dispatch = useDispatch();
  const location = useLocation();
  
  // mount useEffect that creates the main arrays with which the application works
  useEffect(() => {
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
        <Route path='/update' element={<UpdateForm />} />
      </Routes>
    </div>
  );
};

export default App;
