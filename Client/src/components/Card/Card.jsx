// Import styles;
import style from "./Card.module.css";
// Import utilities;
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// Import actions;
import { getDetail } from "../../redux/actions";

const Card = ({ id, title, image, score, diets }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDetail("none"));
	}, []);

	return (
		<div className={style.presentacion} style={{ backgroundImage: `url(${image})` }}>
			<div
				className={style.score}
				style={{
					borderWidth: "2px",
					borderStyle: "solid",
					borderColor: `${score >= 80 ? "green" : score >= 65 ? "yellow" : score >= 50 ? "orange" : "red"}`,
				}}>
				{score}
			</div>
			<div className={style.nameContainer}>
				<h5 className={style.nombre}>{title}</h5>
			</div>
			<div className={style.propiedades}>
				<div>
					<h4>Diets:</h4>
					{diets.length ? (
						diets.map((diet, index) => {
							const capitalizedDiet = diet
								.split(" ")
								.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
								.join(" ");
							return (
								<h5 key={diet.id}>
									{capitalizedDiet}
									<br />
								</h5>
							);
						})
					) : (
						<h5>This food escapes any possible diet... 😂😂</h5>
					)}
				</div>
				<div>
					<hr />
					<Link to={`/detail/${id}`} className={style.link}>
						<h4>Click for more info</h4>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Card;
