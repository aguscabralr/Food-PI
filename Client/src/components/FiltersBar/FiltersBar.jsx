// Import styles & assets;
import style from './FiltersBar.module.css';
import foodLogo from '../../assets/logowithout.png';
// Import utilities;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import components;
import Card from '../Card/Card';
// Import actions
import { filterDiet, filterOrigin } from '../../redux/actions';

const FiltersBar = () => {
  const dispatch = useDispatch();
  
  const [checkedDiets, setCheckedDiets] = useState([]);
  
  const handleDiet = (event) => {
    const { value, checked } = event.target;

    if (value === 'all') {
      if (checked) setCheckedDiets([])
    } else {
      if (checked) setCheckedDiets([...checkedDiets, value]);
      else setCheckedDiets(checkedDiets.filter(diet => diet !== value));
    };
  };

  const handleOrigin = (event) => {
    const { value } = event.target;

    if (value === 'D') dispatch(filterOrigin('number'));
    else if(value === 'C') dispatch(filterOrigin('string'));
  };
  
  useEffect(() => {
    dispatch(filterDiet(checkedDiets));
  }, [checkedDiets]);

  return (
    <div className={style.container}>
      <div className={style.navSpace}></div>
      <div className={style.filterContainer}>
        <label htmlFor='order'>Select Order<br />
          <select name=' id='>
            <option value='A'>Ascending A-Z</option>
            <option value='Z'>Descending Z-A</option>
            <option value='0'>Ascending 0-100</option>
            <option value='100'>Descending 100-0</option>
          </select>
        </label>
        <label htmlFor='origin'>Select Origin<br />
          <select name='origin' onChange={handleOrigin}>
            <option name='origin' value='O'>Origins...</option>
            <option name='origin' value='D'>Default</option>
            <option name='origin' value='C'>Created</option>
          </select>
        </label>
        <label htmlFor='diets'>Select Diets<br />
          <input type='checkbox' value='all' onChange={handleDiet} checked={checkedDiets.length === 0} />All Diets<br />
          <input type='checkbox' name='diets' value='dairy free' onChange={handleDiet} checked={checkedDiets.includes('dairy free')} />Dairy Free<br />
          <input type='checkbox' name='diets' value='fodmap friendly' onChange={handleDiet} checked={checkedDiets.includes('fodmap friendly')} />Fodmap Friendly<br />
          <input type='checkbox' name='diets' value='gluten free' onChange={handleDiet} checked={checkedDiets.includes('gluten free')} />Gluten Free<br />
          <input type='checkbox' name='diets' value='ketogenic' onChange={handleDiet} checked={checkedDiets.includes('ketogenic')} />Ketogenic<br />
          <input type='checkbox' name='diets' value='lacto ovo vegetarian' onChange={handleDiet} checked={checkedDiets.includes('lacto ovo vegetarian')} />Lacto-Ovo Vegetarian<br />
          <input type='checkbox' name='diets' value='paleolithic' onChange={handleDiet} checked={checkedDiets.includes('paleolithic')} />Paleolithic<br />
          <input type='checkbox' name='diets' value='pescetarian' onChange={handleDiet} checked={checkedDiets.includes('pescetarian')} />Pescetarian<br />
          <input type='checkbox' name='diets' value='primal' onChange={handleDiet} checked={checkedDiets.includes('primal')} />Primal<br />
          <input type='checkbox' name='diets' value='vegan' onChange={handleDiet} checked={checkedDiets.includes('vegan')} />Vegan<br />
          <input type='checkbox' name='diets' value='whole 30' onChange={handleDiet} checked={checkedDiets.includes('whole 30')} />Whole30<br />
        </label>
      </div>
    </div>
  )
}

export default FiltersBar;