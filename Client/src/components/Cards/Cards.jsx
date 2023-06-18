// Import styles & assets;
import style from './Cards.module.css';
// Import utilities;
import { useSelector } from 'react-redux';
// Import components;
import Card from '../Card/Card';
// Import actions

const Cards = () => {
  const { filters } = useSelector(state => state);
  
  return (
    <div className={style.container}>
      { filters.length 
            ? <div className={style.cardsContainer}>
              {filters.map(e => {
                return <Card
                  key={e.id}
                  id={e.id}
                  title={e.title}
                  image={e.image} alt={e.title}
                  diets={e.diets}
                /> 
              })}
            </div>            
          : <div className={style.waitConteiner}>
              <div><h3 className={style.load}>Waiting Foods....</h3></div>
            </div>
      }
    </div>
  );
};

export default Cards;