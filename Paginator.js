import React, { Component } from 'react';

import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

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
            displayResultsFrom: dataCount === 0 ? 0 : (pageSize * (currentPage - 1)) + 1,
            displayResultsTo: dataCount === 0 ? 0 : Math.min((((pageSize * (currentPage - 1))) + pageSize), dataCount),
            displayResultsTotal: dataCount
        };
    }

    changePage(pageNumber) {
        this.props.onPageChanged(pageNumber);
    }

    render() {
        var model = this.computeModel();
        return (
            <div className="pagination">
                <div className={classNames({'first': true, 'disabled': !model.firstPageButton.enabled})} onClick={() => this.changePage(model.firstPageButton.number)}>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </div>
                <div className={classNames({'prev': true, 'disabled': !model.previousPageButton.enabled})} onClick={() => this.changePage(model.previousPageButton.number)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className={classNames({'item': true, 'disabled': true })}><span className="nowrap">Page {model.currentPageNumber} of {model.totalNumberOfPages}</span></div>
                
                <div className={classNames({'next': true, 'disabled': !model.nextPageButton.enabled})} onClick={() => this.changePage(model.nextPageButton.number)} >
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <div className={classNames({'last': true, 'disabled': !model.lastPageButton.enabled})} onClick={() => this.changePage(model.lastPageButton.number)} >
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                </div>
                <div className="right disabled">
                    Displaying results {model.displayResultsFrom} - {model.displayResultsTo} of {model.displayResultsTotal}
                </div>
            </div>
        );
    }
}

Paginator.defaultProps = {
    onPageChanged: () => {}
}