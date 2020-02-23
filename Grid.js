import React, { Component } from 'react';

import Paginator from './Paginator';
import Header from './Header';
import Column from './Column';
import Cell from './Cell';
import ExpandableCell from './ExpandableCell';
import { _styles } from './plugins/all'

import { faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Grid extends Component {
    displayName = Grid.name

    constructor(props) {
        super(props);

        this.state = {
            selectedKeys: [],
            selectedItems: [],
            selectedLast: null
        }

        this.toggleSelectRow = this.toggleSelectRow.bind(this);
        this.renderRows = this.renderRows.bind(this);
     
        _styles.importStyles(this.props.skin);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.skin !== this.props.skin) {
            _styles.importStyles(this.props.skin);
        }
    }

    toggleSelectRow(event, key) {

        let isCtrl = event.ctrlKey;
        let isShift = event.shiftKey;

        if (isCtrl || isShift) {
            event.preventDefault(); // this works everywhere, except IE
            document.getSelection().removeAllRanges(); // hack for IE
        }

        var newSelectedKeys = [];
        var newSelectedItems = [];

        // keep existing values if Ctrl is pressed
        if (isCtrl) {
            newSelectedKeys = this.state.selectedKeys.slice();
            newSelectedItems = this.state.selectedItems.slice();
        }

        let keyStart = key;
        let keyEnd = key;

        if (isShift) {
            let currentKeys = [];
            this.props.data.forEach((item) => {
                currentKeys.push(item[this.props.keyField]);
            });
            let posStart = currentKeys.indexOf(this.state.selectedLast);
            let posEnd = currentKeys.indexOf(keyStart);

            if (posStart < posEnd) {
                keyStart = this.state.selectedLast;
            }
            else {
                keyEnd = this.state.selectedLast;
            }
        };

        let update = false;
        this.props.data.forEach((item) => {

            if (item.Code === keyStart)
                update = true;

            if (update) {
                if (newSelectedKeys.indexOf(item.Code) === -1) {
                    newSelectedKeys.push(item.Code);
                    newSelectedItems.push(item);
                }
                else {
                    newSelectedKeys = newSelectedKeys.filter((code) => {
                        return code !== item.Code;
                    })
                    if (this.props.keyField) {
                        newSelectedItems = newSelectedItems.filter((selItem) => {
                            return selItem[this.props.keyField] !== item.key;
                        });
                    }
                }
            }

            if (item.Code === keyEnd) {
                update = false;
            }
        });

        this.setState({
            selectedKeys: newSelectedKeys,
            selectedItems: newSelectedItems,
            selectedLast: key
        });

        this.props.onSelectChanged(newSelectedKeys, newSelectedItems);
    }

    renderRows(children) {
        let noData = !this.props.data || (this.props.data.length === 0);

        if (this.props.loading && noData) {
            return (
                <tr key="loading">
                    <td colSpan={this.props.children.length + (this.props.isExpandable ? 1 : 0)} align="center" className="bold">
                        <FontAwesomeIcon icon={faSync} className="fa-spin mr-3" /> Loading data ...
                    </td>
                </tr>
            );
        }
        else {
            if (noData) {
                return (
                    <tr key="empty">
                        <td colSpan={this.props.children.length + (this.props.isExpandable ? 1 : 0)} align="center">
                            {this.props.emptyText}
                        </td>
                    </tr>
                );
            }
            else {
                return this.props.data.map((item, index) => {
                    let key = this.props.keyField ? item[this.props.keyField] : index;
                    let classNames = [];
                    classNames.push(this.props.classNameRowRenderer(item));
                    let onMouseOver = () => { };
                    let onMouseOut = () => { };
                    let onMouseDown = () => { };
                    let onClick = () => { };
                    let isSelected = false;

                    if (this.props.enableSelection) {
                        isSelected = (this.state.selectedKeys.indexOf(key) !== -1);
                        if (!isSelected) {
                            onMouseOver = (event) => {
                                let tr = event.currentTarget;
                                tr.classList.add("grid-selected");
                            }
                            onMouseOut = (event) => {
                                let tr = event.currentTarget;
                                tr.classList.remove("grid-selected");
                            }
                        }
                        onMouseDown = (event) => {
                            if (event.ctrlKey || event.shiftKey) {
                                event.preventDefault();
                            }
                        }
                        onClick = (event) => this.toggleSelectRow(event, key, item);
                    }

                    if (isSelected) {
                        classNames.push("grid-selected");
                    }

                    return (
                        <React.Fragment key={key}>
                            <tr
                                className={classNames.join(' ')}
                                onClick={onClick}
                                onMouseDown={onMouseDown}
                                onMouseOver={onMouseOver}
                                onMouseOut={onMouseOut}>
                                <ExpandableCell className="text-center" dataItem={item} isVisible={this.props.isExpandable} isExpanded={item.isExpanded} onExpand={
                                    (dataItem) => {
                                        item.isExpanded = !item.isExpanded;
                                        var dataCopy = Object.assign({}, this.props.data);
                                        dataCopy.dataItems = dataCopy.dataItems.slice();
                                        dataCopy.items[key].isExpanded = !dataCopy.items[key].isExpanded;
                                        this.setState({ data: !this.state.dataCopy });
                                    }
                                } />
                                {React.Children.map(children, (child, i) => {
                                    return (<Cell {...child.props} data={item} onCellClick={this.props.onCellClick} emptyPlaceholder={this.props.emptyPlaceholder} />);
                                })}
                            </tr>
                            {
                                this.props.isExpandable && item.isExpanded &&
                                <tr style={{ 'backgroundColor': '#fff' }}>
                                    <td> </td>
                                    <td colSpan={this.props.children.length}>
                                        {React.cloneElement(this.props.SubGrid(item), { data: item })}
                                    </td>
                                </tr>
                            }
                        </React.Fragment>
                    );
                });
            }
        }
    }

    handlePageChange(newPage) {
        this.props.onStateChanged({
            pageSize: this.props.pageSize,
            pageNr: newPage,
            orderBy: this.props.orderBy,
            orderDir: this.props.orderDir
        });
    }

    handleSortChange(newOrderBy, neworderDir) {
        this.props.onStateChanged({
            pageSize: this.props.pageSize,
            pageNr: 1,
            orderBy: newOrderBy,
            orderDir: neworderDir
        });
    }

    render() {
        const children = [];
        const validType = (child) => { return React.isValidElement(child) && (child.type === Column) };

        // allow only valid Columns in main collection and inside it (in case we have an empty container)
        React.Children.toArray(this.props.children).map(child => {
            if (validType(child)) {
                children.push(child);
            }
            else {
                if (React.isValidElement(child) && child.props.children) {
                    React.Children.toArray(child.props.children).map((subChild) => {
                        if (validType(subChild)) {
                            children.push(subChild);
                        };

                        return null;
                    });
                }
            };

            return null;
        });

        let noData = !this.props.gridData || !this.props.gridData.dataItems || (this.props.gridData.dataItems.length === 0);

        return (
            <div className={`digital-grid-wrapper ${this.props.skin? `skin-${this.props.skin}`: ``}`}>
                <table className={this.props.className + ' digital-grid'} style={{ 'opacity': (this.props.loading && !noData) ? 0.4 : 1 }}>
                    <thead>
                        <tr>
                            <th key='emptyHeader' style={(this.props.isExpandable && children.length >= 1) ? {} : { 'display': 'none' }}></th>
                            {React.Children.map(children, (child, i) => {
                                return <Header {...child.props} orderBy={this.props.orderBy} key={i} orderDir={this.props.orderDir} onSortChanged={(orderBy, orderDir) => this.handleSortChange(orderBy, orderDir)} />;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows(children)}
                    </tbody>
                </table>
                {
                    this.props.enableSelection && this.props.showSelectionInfo &&
                    <div className="text-info p-3">
                        [icon:info]
                        <small>
                            Row selection is enabled.<br />
                            Multiselect is also enabled by using the Shift and/or Ctrl keys.
                        </small>
                    </div>
                }
                {
                    ((this.props.dataCount > this.props.data.length) && (this.props.pageSize > 0)) &&
                    <Paginator
                        pageNr={this.props.pageNr}
                        pageSize={this.props.pageSize}
                        dataCount={this.props.dataCount}
                        onPageChanged={(page) => this.handlePageChange(page)}
                    />
                }
            </div>
        );
    }
}

Grid.defaultProps = {
    skin: 'default',
    className: '',
    classNameRowRenderer: () => { },

    onStateChanged: () => { },
    enableSelection: false,
    onSelectChanged: () => { },
    showSelectionInfo: true,
    
    data: [],
    dataCount: 0,
    pageNr: 1,
    pageSize: 0,
    orderBy: '?',
    orderDir: 'ASC',
    emptyText: "No data available!",
    isExpandable: false,
    SubGrid: () => { return <></>; }
}

export { Grid, Column };