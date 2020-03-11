import React, { Component } from 'react';

import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export default class Paginator extends Component {
  maximumNumberOfPageButtons = 11;

  computeModel() {
    let currentPage = this.props.pageNr;
    let pageSize = this.props.pageSize;
    let dataCount = this.props.dataCount;
    let totalNumberOfPages = Math.ceil(dataCount / pageSize);

    return {
      currentPageNumber: currentPage,
      totalNumberOfPages: totalNumberOfPages,
      firstPageButton: {
        number: 1,
        enabled: currentPage > 1
      },
      previousPageButton: {
        number: currentPage > 1 ? currentPage - 1 : 1,
        enabled: currentPage > 1
      },
      nextPageButton: {
        number: currentPage < totalNumberOfPages ? currentPage + 1 : totalNumberOfPages,
        enabled: currentPage < totalNumberOfPages
      },
      lastPageButton: {
        number: totalNumberOfPages,
        enabled: currentPage < totalNumberOfPages
      },
      displayResultsFrom: dataCount === 0 ? 0 : pageSize * (currentPage - 1) + 1,
      displayResultsTo:
        dataCount === 0 ? 0 : Math.min(pageSize * (currentPage - 1) + pageSize, dataCount),
      displayResultsTotal: dataCount
    };
  }

  changePage(pageNumber) {
    this.props.onPageChanged(pageNumber);
  }

  render() {
    var model = this.computeModel();
    return (
      <ul className='pagination'>
        <li className={classNames({ first: true, 'page-item': true, disabled: !model.firstPageButton.enabled })}>
            <span className='page-link' onClick={() => this.changePage(model.firstPageButton.number)}>
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </span>
        </li>
        <li className={classNames({ prev: true, 'page-item': true, disabled: !model.previousPageButton.enabled })}>
            <span className='page-link' onClick={() => this.changePage(model.previousPageButton.number)}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
        </li>
        <li className={classNames({ page: true, 'page-item': true })}>
          <span className='nowrap page-link'>
            Page {model.currentPageNumber} of {model.totalNumberOfPages}
          </span>
        </li>

        <li className={classNames({ next: true, 'page-item': true, disabled: !model.nextPageButton.enabled })}>
          <span className='page-link' onClick={() => this.changePage(model.nextPageButton.number)}>
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </li>
        <li className={classNames({ last: true, 'page-item': true, disabled: !model.lastPageButton.enabled })}>
          <span className='page-link' onClick={() => this.changePage(model.lastPageButton.number)}>
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </span>
        </li>
        <li className='right page-item'>
          <span className='page-link'>
            Displaying results {model.displayResultsFrom} - {model.displayResultsTo} of{' '}
            {model.displayResultsTotal}
          </span>
        </li>
      </ul>
    );
  }
}

Paginator.defaultProps = {
  onPageChanged: () => {}
};
