import React, { Component } from 'react';

class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentPage, pageNumbers, setPage } = this.props;

    const prevClassName =
      currentPage === 1 ? 'prev arrow disabled' : 'prev arrow';
    const nextClassName =
      currentPage === pageNumbers.length ? 'next arrow disabled' : 'next arrow';
    const pageNumberClassName =
      ind + 1 === currentPage
        ? 'pageNumbers arrow active'
        : 'pageNumbers arrow';

    return (
      <div className="pagination">
        <div onClick={() => setPage('prev')} className={prevClassName}>
          {'<'}
        </div>
        {pageNumbers.map((el, ind) => {
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
  }
}

export default Pagination;
