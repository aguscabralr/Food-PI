// Import styles & assets;
import style from "./About.module.css";
import me from "../../assets/me.png";
import fondo from '../../assets/aboutfondo.png';

const About = () => {
  return (
    <div className={style.contenedor} style={{ backgroundImage: `url(${fondo})` }}>
      <div className={style.info}>
        <article className={style.text}>
          <h1>Agustin Cabral</h1>
          <p>STATUS | FullStack Webdeveloper in Progress...</p>
          <p>GENDER | Male</p>
          <p>SPECIE | Human</p>
          <p>ORIGIN | Cordoba, Argentina</p>
        </article>
      </div>
      <div className={style.foto}>
        <img src={me} alt="Yo" />
      </div>
    </div>
  );
};

export default About;
