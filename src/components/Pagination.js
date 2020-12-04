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

    return (
      <div className="pagination">
        <div onClick={() => setPage('prev')} className={prevClassName}>
          {'<'}
        </div>
        {pageNumbers.map((el, ind) => {
          const cname =
            ind + 1 === currentPage
              ? 'pageNumbers arrow active'
              : 'pageNumbers arrow';
          return (
            <div className={cname} onClick={() => setPage(ind + 1)} key={ind}>
              {ind + 1}
            </div>
          );
        })}
        <div
          onClick={() => this.props.setPage('next')}
          className={nextClassName}
        >
          {'>'}
        </div>
      </div>
    );
  }
}

export default Pagination;
