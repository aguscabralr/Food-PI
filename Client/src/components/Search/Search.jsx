// Import styles & assets;
import style from './Search.module.css';
// Import utilities;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Import components;
import Card from '../Card/Card';
// Import actions
import { filterDiet, filterOrigin, findRecipes } from '../../redux/actions';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { finders } = useSelector(state => state);

  const cleanFinders = () => {
    dispatch(findRecipes('none'));
    navigate('/home');
  };

  return (
    <div>
      {finders.length
        ? <div className={style.container}>
            <div className={style.buttonContainer}>
              <button onClick={cleanFinders}>➤</button>
            </div>
            <div className={style.cardsContainer}>
              {finders.map(e => {
                return <Card
                  key={e.id}
                  id={e.id}
                  title={e.title}
                  image={e.image} alt={e.title}
                  diets={e.diets}
                />
              })}
            </div>
          </div>
        : <div className={style.waitConteiner}>
            <div><h3 className={style.load}>Waiting Foods....</h3></div>
          </div>
      }
    </div>
  );
};

export default Search;