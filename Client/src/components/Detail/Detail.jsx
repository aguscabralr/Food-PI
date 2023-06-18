// Import styles;
import style from './Detail.module.css';
import fondo from '../../assets/fondo.png'
// Import utilities;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Import actions;
import axios from 'axios';


const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const url = `http://localhost:3001/foodpi/recipes/id/${id}`;

  useEffect(() => {
    axios(url)
      .then(({ data }) => {
        setDetail(data);
      });
    return setDetail({});
  }, [id]);

  return (
    <div className={style.conteiner} style={{ backgroundImage: `url(${fondo})`}}>
      {
        detail.hasOwnProperty('title') 
          ? <div className={style.infoContainer}>
              <div className={style.port}>
                <div className={style.info}>
                  <h1>{detail.title && detail.title}</h1>
                  <div className={style.text}>
                    <h2>HEALTH SCORE</h2>
                    <p>{detail.healthScore && detail.healthScore}</p>
                  </div>
                  <div className={style.text}>
                    <h2>DIETS</h2>
                    {detail.diets && detail.diets.length
                      ? detail.diets.map((diet, index) => {
                          const capitalizedDiet = diet
                          .split(' ')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ');
                          return <p key={index}>{capitalizedDiet}<br /></p>
                        })
                      : <p>This food escapes any possible diet... <br/>😂😂</p>
                    }
                  </div>
                </div>
                <div className={style.foto}>
                  <img src={detail.image && detail.image} alt='Food Image' />
                </div>
              </div>
              <div className={style.text}>
                <hr/>
                <h2>SUMMARY</h2>
              <p>{detail.summary && (
                <span dangerouslySetInnerHTML={{ __html: detail.summary }} />
              )}</p>
                <h2>INSTRUCTIONS</h2>
                <div className={style.instructions}>
                  {detail.analyzedInstructions && detail.analyzedInstructions[0].steps.map((instruction, index) => (
                    <div className={style.steps} key={index}>
                      <h3>Paso {instruction.number}</h3>
                      <p>{instruction.step}</p>
                      {instruction.ingredients && (
                        <ul>
                          {instruction.ingredients.map((ingredient, ingredientIndex) => (
                            <li key={ingredientIndex}>{ingredient.name}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          : <div className={style.waitConteiner}>
              <div>
                <h3 className={style.load}>Loading Food....</h3>
              </div>
            </div>
      }
    </div>
  )
};

export default Detail;