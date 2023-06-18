// Import styles & assets;
import style from './LandingPage.module.css';
import logo from '../../assets/logowithout.png';
import fondo from '../../assets/fondo.png';
import lin from '../../assets/linkedin.png';
import git from '../../assets/github.png';
import wpp from '../../assets/whatsapp.png';
import ema from '../../assets/email.png';
// Import utilities;
import { Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div className={style.container} style={{ backgroundImage: `url(${fondo})` }}>
      <div className={style.port} style={{ backgroundImage: `url(${logo})` }}></div>
      <div className={style.info}>
        <div className={style.accessContain}>
          <Link to={'/home'} style={{ textDecoration: 'none' }}>
            <div className={style.enter}>Enter</div>
          </Link>
        </div>
        <div className={style.icoContain}>
          <a href="https://www.linkedin.com/in/aguscabralr/" target='_blanck'><div className={style.ico} style={{ backgroundImage: `url(${lin})` }}></div></a>
          <a href="https://github.com/aguscabralr" target='_blanck'><div className={style.ico} style={{ backgroundImage: `url(${git})` }}></div></a>
          <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSKkkRbGBKZnBPDrJqFkhFVczQQTFpQTqdFnbfVXBcDzlnGtFWNRvQCpvnVQKWFKXWbFQQCN" target='_blanck'><div className={style.icoM} style={{ backgroundImage: `url(${ema})` }}></div></a>
          <a href="https://api.whatsapp.com/send?phone=543515142250" target='_blanck'><div className={style.ico} style={{ backgroundImage: `url(${wpp})` }}></div></a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;