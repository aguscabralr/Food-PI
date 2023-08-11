// Import styles & assets;
import style from "./Search.module.css";
// Import utilities;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Import components;
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
// Import actions
import { findRecipes } from "../../redux/actions";

const Search = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { finders } = useSelector((state) => state);
	const [load, setLoad] = useState(true);

	const cleanFinders = () => {
		dispatch(findRecipes("none"));
		navigate("/home");
	};

	const [currentPage, setCurretPage] = useState(1);
	const postsPerPage = 10;

	const lastPostIndex = currentPage * postsPerPage;
	const firstPostIndex = lastPostIndex - postsPerPage;
	let currentPosts = finders.slice(firstPostIndex, lastPostIndex);

	useEffect(() => {
		setLoad(true);
		if (!finders.length) {
			setTimeout(() => {
				setLoad(false);
			}, 2000);
		}
		clearTimeout;
		currentPosts = finders.slice(firstPostIndex, lastPostIndex);
		setCurretPage(1);
	}, [finders]);

	return (
		<div>
			{finders.length ? (
				<div className={style.container}>
					<div className={style.cardsContainer}>
						{finders.map((e) => {
							return (
								<Card
									key={e.id}
									id={e.id}
									title={e.title}
									image={e.image}
									alt={e.title}
									diets={e.diets}
									score={e.healthScore}
								/>
							);
						})}
					</div>
					<div className={style.pagination}>
						<div className={style.buttonContainer}>
							<button onClick={cleanFinders}>➤</button>
						</div>
						<Pagination
							totalPosts={finders.length}
							postsPerPage={postsPerPage}
							currentPage={currentPage}
							setCurrentPage={setCurretPage}
						/>
					</div>
				</div>
			) : load ? (
				<div className={style.waitConteiner}>
					<div>
						<h3 className={style.load}>Searching....</h3>
					</div>
				</div>
			) : (
				<div className={style.waitConteiner}>
					<div>
						<h3 style={{ color: "#fff" }}>The recipe you're trying to look for doesn't exist</h3>
					</div>
				</div>
			)}
		</div>
	);
};

export default Search;
