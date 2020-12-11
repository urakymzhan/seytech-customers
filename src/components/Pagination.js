import React from 'react';

const Pagination = ({ currentPage, pageNumbers, setPage }) => {
  const prevClassName =
    currentPage === 1 ? 'prev arrow disabled' : 'prev arrow';
  const nextClassName =
    currentPage === pageNumbers.length ? 'next arrow disabled' : 'next arrow';

  return (
    <div className="pagination">
      <div onClick={() => setPage('prev')} className={prevClassName}>
        {'<'}
      </div>
      {pageNumbers.map((el, ind) => {
        const pageNumberClassName =
          ind + 1 === currentPage
            ? 'pageNumbers arrow active'
            : 'pageNumbers arrow';
        return (
          <div
            className={pageNumberClassName}
            onClick={() => setPage(ind + 1)}
            key={ind}
          >
            {ind + 1}
          </div>
        );
      })}
      <div onClick={() => setPage('next')} className={nextClassName}>
        {'>'}
      </div>
    </div>
  );
};

export default Pagination;
