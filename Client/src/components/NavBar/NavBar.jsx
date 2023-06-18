// Import styles & assets;
import style from './NavBar.module.css';
import foodLogo from '../../assets/logowithout.png';
// Import utilities;
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Import actions;
import { findRecipes } from '../../redux/actions';

const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const onSearch = () => {
    dispatch(findRecipes(title));
    navigate(`/search/${title}`);
  };
  
  return (
    <div className={location.pathname === '/home' ? style.navHome : style.nav}>
      {location.pathname === '/home' ? <div className={style.aux}></div> : <div></div>}
      <Link to='/home'><div className={style.logoContainer} style={{ backgroundImage: `url(${foodLogo})` }}></div></Link>
      <div className={style.utilsContain}>
        <div className={style.searchContainer}>
          <input className={style.barra} type='text' onChange={handleChange} value={title} placeholder='Insert Title'/>
          <button className={style.agregar} onClick={() => {onSearch(); setTitle('')}}>🔎</button>
        </div>
        <div className={style.linksContainer}>
          <Link to='/home' className={style.link}><div className={style.linkContainer}>Home</div></Link>
          <Link to='/create' className={style.link}><div className={style.linkContainer}>Create Recipe</div></Link>
          <Link to='/about' className={style.link}><div className={style.linkContainer}>About</div></Link>
          <Link to='/' className={style.link}><div className={style.linkContainer}>Landing Page</div></Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;