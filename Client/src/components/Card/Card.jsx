// Import styles;
import style from './Card.module.css';
// Import utilities;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, title, image, diets }) => {

  return (
    <div className={style.presentacion} style={{backgroundImage: `url(${image})`}}>
      {/* <button className={fav} onClick={handleFavorite}>{isFav ? '❤️' : '🤍'}</button> */}
      <div className={style.nameContainer}>
        <h3 className={style.nombre}>{title}</h3>
      </div>
      <div className={style.propiedades}>
        <div>
          <h2>Diets:</h2>
          { diets.length
              ? diets.map((diet, index) => {
                  const capitalizedDiet = diet
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                  return <h4 key={index}>{capitalizedDiet}<br /></h4>
                })
              : <h4>This food escapes any possible diet... 😂😂</h4>
          }
        </div>
        <div>
          <hr />
          <Link to={`/detail/${id}`} className={style.link}>
            <h3>Click for more info</h3>
          </Link>
        </div>
      </div>
        
    </div>
  );
};

export default Card;