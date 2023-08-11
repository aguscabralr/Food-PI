// Import styles;
import style from './UpdateForm.module.css';
import fondo from '../../assets/fondo.png';
// Import utilities;
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Import validators;
import validate from './validate';
// Import actions;
import { getRecipes } from '../../redux/actions';

const UpdateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detail } = useSelector(state => state);
  const steps = detail.analyzedInstructions[0].steps.map(step => step.step);

  const [data, setData] = useState({
    name: detail.title,
    image: detail.image,
    summary: detail.summary,
    healthScore: detail.healthScore,
    analyzedInstructions: steps,
    diets: detail.diets,
  });

  const [error, setError] = useState({
    name: '',
    image: '',
    summary: '',
    healthScore: '',
    analyzedInstructions: [''],
    diets: '',
  });
  
  useEffect(() => {
    setError((validate({ ...data })));
  }, [data])
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith('analyzedInstructions')) {
      const index = Number(name.match(/\d+/));
      const updateSteps = [...data.analyzedInstructions];
      updateSteps[index] = value;
      setData({ ...data, analyzedInstructions: updateSteps });
      setError(validate({ ...data, analyzedInstructions: updateSteps }));
    } else {
      setData({ ...data, [name]: value, });
      setError(validate({ ...data, [name]: value }));
    };
  };

  const addStep = () => {
    if (data.analyzedInstructions.length < 10) {
      setData({ ...data, analyzedInstructions: [...data.analyzedInstructions, ''] });
    
      console.log(data.analyzedInstructions);
    }
  };
  const deleteStep = () => {
    if (data.analyzedInstructions.length > 1) {
      data.analyzedInstructions.pop();
      setData({ ...data, analyzedInstructions: [...data.analyzedInstructions] });
    };
  };

  const handleCheckChange = (event) => {
    const { value, checked } = event.target;

    if (checked) setData({ ...data, diets: [...data.diets, value] });
    else setData({ ...data, diets: data.diets.filter(diet => diet !== value) });
  };
  
  const { diets } = useSelector(state => state);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const recipe = {
        id: detail.id,
        title: data.name,
        image: data.image,
        summary: data.summary,
        healthScore: data.healthScore,
        analyzedInstructions: data.analyzedInstructions,
        diets: data.diets,
      };

      if (error.name || error.image || error.summary || error.healthScore || error.analyzedInstructions.length > 1 || error.diets) window.alert('Review the data entered');
      else {
        const { data } = await axios.put('/recipes', recipe);
        if (data) {
          dispatch(getRecipes());
          alert('Recipe Uptdated');
          navigate(`/detail/${data}`);
        };
      };
    } catch (error) {
      alert('Update Failed');
    };
  };

  return (
    <div className={style.container} style={{ backgroundImage: `url(${fondo})` }}>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <div className={style.divition}>
          <div className={style.inputContainer}>
            <label htmlFor='name'>Name | {error.name ? `❌ ${error.name}` : data.name === detail.title ? `⭕` : '✔️'}</label>
            <input type='text' name='name' value={data.name} onChange={handleInputChange} placeholder='Insert the name of your recipe...'/> 
          </div>
          <div className={style.inputContainer}>
            <label htmlFor='image'>Image | {error.image ? `❌ ${error.image}` : data.image === detail.image ? `⭕` : '✔️'}</label>
            <input type='text' name='image' value={data.image} onChange={handleInputChange} placeholder='Insert the URL of your image...'/>
          </div>
          <div className={style.inputContainer}>
            <label htmlFor='summary'>Summary | {error.summary ? `❌ ${error.summary}` : data.summary === detail.summary ? `⭕` : '✔️'}</label>
            <textarea name="summary" value={data.summary} cols="30" rows="5" onChange={handleInputChange} placeholder='Insert the summary of your recipe...'></textarea>
          </div>
          <div className={style.inputContainer}>
            <label htmlFor='diets'>Diets | Select the corrects {JSON.stringify(data.diets.sort()) === JSON.stringify(detail.diets.sort()) ? `⭕` : '✔️'}</label>
            <div className={style.check}>
              {diets.length && diets.map((diet, index) => {
              return (
                <div key={index}>
                  <input type='checkbox' name='diets' value={diet.name} onChange={handleCheckChange} checked={data.diets.includes(`${diet.name}`)} />
                    <label htmlFor='diet'>{diet.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</label>
                </div>
              )
            })}
            </div>
          </div>
        </div>
        <div className={style.divition}>
          <div className={style.inputContainer}>
            <div className={style.title}>
              <label htmlFor='analyzedInstructions'>Instructions | { error.analyzedInstructions[0] ? error.analyzedInstructions[0].length ? `❌ ${error.analyzedInstructions[0]}` : '✔️' : JSON.stringify(data.analyzedInstructions.sort()) === JSON.stringify(steps.sort()) ? `⭕` : '✔️'} | </label>
              <button type='button' onClick={addStep}>+</button>
              <button type='button' onClick={deleteStep}>-</button>
            </div>
            {data.analyzedInstructions.map((step, index) => {
              // console.log(data.analyzedInstructions);
              return (
                <div key={index} className={style.step}>
                  <label htmlFor='step'>Step {index + 1} |</label>
                  <input type='text' name={`analyzedInstructions${[index]}`} value={data.analyzedInstructions[index]} onChange={handleInputChange} placeholder='Insert a step of your recipe...'/> {error.analyzedInstructions.includes(`Complete the step ${index + 1}`) ? '❌' : data.analyzedInstructions[index] === steps ? `⭕` : '✔️'}
                </div>
              )
            })
            }
          </div>
          <div className={style.inputContainer}>
            <label htmlFor='healthScore'>Health Score | {error.healthScore ? `❌ ${error.healthScore}` : parseInt(data.healthScore) === detail.healthScore ? `⭕` : '✔️'}</label>
            <div className={style.range}>
              <input type='range' min={0} max={100} name='healthScore' value={data.healthScore} onChange={handleInputChange} />
              <span>{data.healthScore}</span>
            </div>
          </div>
          <div>
            <button type='submit'>Update Recipe</button>
          </div>
        </div>
      </form>
      <div className={style.previewContainer}>
        <h4>Preview</h4>
        {!error.name && <h5>{data.name}</h5>}
        {!error.image && <img src={data.image} alt='Review the URL' style={{width: '80%', height: '150px', objectFit: 'cover'}}/>}
        {!error.summary && <h6>{data.summary}</h6>}
        {!error.healthScore && <h6>{`Health Score ${data.healthScore}`}</h6>}
        {!error.name && <h6>{`${data.diets.length} diet/s`}</h6>}
        {!error.analyzedInstructions.length && <h6>{`${data.analyzedInstructions.length} step/s`}</h6>}
      </div>
    </div>
  );
};

export default UpdateForm;