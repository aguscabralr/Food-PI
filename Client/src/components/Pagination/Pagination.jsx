import style from './Pagination.module.css';

const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
  let pages = [];
  let lastPage = Math.ceil(totalPosts / postsPerPage);
  
  if (currentPage === 1) {
    for (let i = currentPage; i <= currentPage + 4; i++) {
      i <= lastPage && pages.push(i);
    };
  } else if (currentPage === 2) {
    for (let i = currentPage - 1; i <= currentPage + 3; i++) {
      i <= lastPage && pages.push(i);
    };
  } else if (currentPage === lastPage) {
    for (let i = currentPage - 4; i <= currentPage; i++) {
      i <= lastPage && pages.push(i);
    };
  } else if (currentPage === lastPage - 1) {
    for (let i = currentPage - 3; i <= currentPage + 1; i++) {
      i <= lastPage && pages.push(i);
    };
  } else {
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      i <= lastPage && pages.push(i);
    };
  };

  return (
    <div className={style.pagination}>
      {currentPage > 1 && <button className={style.noSelect} onClick={() => setCurrentPage(1)}>{'|<'}</button>}
      {currentPage > 1 && <button className={style.noSelect} onClick={() => setCurrentPage(currentPage - 1)}>{'<'}</button>}
      {
        pages.map((page, index) => {
          return (
            <button key={index} className={currentPage === page ? style.select : style.noSelect} onClick={() => setCurrentPage(page)}>{page}</button>
          )
        })
      }
      {currentPage !== lastPage && <button className={style.noSelect} onClick={() => setCurrentPage(currentPage + 1)}>{'>'}</button>}
      {currentPage !== lastPage && <button className={style.noSelect} onClick={() => setCurrentPage(lastPage)}>{'>|'}</button>}
    </div>
  );
};

export default Pagination