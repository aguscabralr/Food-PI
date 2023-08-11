// Import styles & assets;
import style from "./Cards.module.css";
// Import utilities;
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Import components;
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

const Cards = () => {
	const { filters } = useSelector((state) => state);

	const [load, setLoad] = useState(true);

	const [currentPage, setCurretPage] = useState(1);
	const postsPerPage = 10;

	const lastPostIndex = currentPage * postsPerPage;
	const firstPostIndex = lastPostIndex - postsPerPage;
	let currentPosts = filters.slice(firstPostIndex, lastPostIndex);

	useEffect(() => {
		setLoad(true);
		if (filters.length) setLoad(false);
		if (load)
			setTimeout(() => {
				setLoad(false);
			}, 3300);
		clearTimeout;
		currentPosts = filters.slice(firstPostIndex, lastPostIndex);
		setCurretPage(1);
	}, [filters]);

	return (
		<div className={style.container}>
			{filters.length ? (
				<div className={style.cardsContainer}>
					{currentPosts.map((e) => {
						return <Card key={e.id} id={e.id} title={e.title} image={e.image} score={e.healthScore} diets={e.diets} />;
					})}
				</div>
			) : load ? (
				<div className={style.waitConteiner}>
					<div>
						<h3 className={style.load}>Waiting Foods....</h3>
					</div>
				</div>
			) : (
				<div className={style.waitConteiner}>
					<div>
						<h3 style={{ color: "#fff" }}>There isn't match recipes</h3>
					</div>
				</div>
			)}
			<div className={style.pagination}>
				<Pagination
					totalPosts={filters.length}
					postsPerPage={postsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurretPage}
				/>
			</div>
		</div>
	);
};

export default Cards;
