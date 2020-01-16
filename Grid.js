import React, { Component } from 'react';

import Header from './Header';
import Column from './Column';
import Cell from './Cell';
import ExpandableCell from './ExpandableCell';
import { _styles } from './plugins/all'

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
            this.props.gridData.dataItems.forEach((item) => {
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
        this.props.gridData.dataItems.forEach((item) => {

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
        let noData = !this.props.gridData || !this.props.gridData.dataItems || (this.props.gridData.dataItems.length === 0);

        if (this.props.loading && noData) {
            return (
                <tr key="loading">
                    <td colSpan={this.props.children.length + (this.props.isExpandable ? 1 : 0)} align="center" className="text-info font-weight-bold">
                        [icon:loading] Loading data ...
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
                return this.props.gridData.dataItems.map((dataItem, index) => {
                    let key = this.props.keyField ? dataItem[this.props.keyField] : index;
                    let rowClassName = this.props.rowClassName(dataItem);
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
                        onClick = (event) => this.toggleSelectRow(event, key, dataItem);
                    }

                    if (isSelected) {
                        if (rowClassName)
                            rowClassName += " grid-selected";
                        else
                            rowClassName = "grid-selected";
                    }

                    return (
                        <React.Fragment key={key}>
                            <tr
                                className={rowClassName}
                                onClick={onClick}
                                onMouseDown={onMouseDown}
                                onMouseOver={onMouseOver}
                                onMouseOut={onMouseOut}>
                                <ExpandableCell className="text-center" dataItem={dataItem} isVisible={this.props.isExpandable} isExpanded={dataItem.isExpanded} onExpand={
                                    (dataItem) => {
                                        dataItem.isExpanded = !dataItem.isExpanded;
                                        var gridDataCopy = Object.assign({}, this.props.gridData);
                                        gridDataCopy.dataItems = gridDataCopy.dataItems.slice();
                                        gridDataCopy.dataItems[key] = Object.assign({}, gridDataCopy.dataItems[key]);
                                        gridDataCopy.dataItems[key].isExpanded = !gridDataCopy.dataItems[key].isExpanded;
                                        this.setState(gridDataCopy);
                                    }
                                } />
                                {React.Children.map(children, (child, i) => {
                                    return (<Cell {...child.props} dataItem={dataItem} onCellClick={this.props.onCellClick} emptyPlaceholder={this.props.emptyPlaceholder} />);
                                })}
                            </tr>
                            {
                                this.props.isExpandable && dataItem.isExpanded &&
                                <tr style={{ 'backgroundColor': '#fff' }}>
                                    <td> </td>
                                    <td colSpan={this.props.children.length}>
                                        {React.cloneElement(this.props.SubGrid(dataItem), { dataItem: dataItem })}
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
        var newGridData = Object.assign({}, this.props.gridData, {
            pageNumber: newPage
        });

        // set new state
        this.setState(() => {
            return { gridData: newGridData }
        });

        this.props.onStateChanged({
            pageSize: this.props.gridData.pageSize,
            pageNumber: newPage,
            orderBy: this.props.gridData.orderBy,
            orderDir: this.props.gridData.orderDir
        });
    }

    handleSortChange(newOrderBy, neworderDir) {
        var newGridData = Object.assign({}, this.props.gridData, {
            orderBy: newOrderBy,
            orderDir: neworderDir
        });

        // set new state
        this.setState(() => {
            return { gridData: newGridData }
        });

        this.props.onStateChanged({
            pageSize: this.props.gridData.pageSize,
            pageNumber: 1,
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
            <div style={{ overflowX: "auto", "overflowY": "hidden" }}>
                <table className={this.props.className + ' digital-grid'} style={{ 'opacity': (this.props.loading && !noData) ? 0.4 : 1 }}>
                    <thead className={`thead-${this.props.variant}`}>
                        <tr>
                            <th key='emptyHeader' style={(this.props.isExpandable && children.length >= 1) ? {} : { 'display': 'none' }}></th>
                            {React.Children.map(children, (child, i) => {
                                return <Header {...child.props} orderBy={this.props.gridData.orderBy} key={i} orderDir={this.props.gridData.orderDir} onSortChanged={(orderBy, orderDir) => this.handleSortChange(orderBy, orderDir)} />;
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
                    this.props.enablePaging &&
                    <div className="mx-2">
                        <Grid.Paginator
                            page={this.props.gridData.pageNumber || 1}
                            pageSize={this.props.gridData.pageSize || 1}
                            count={this.props.gridData.dataCount || 0}
                            onPageChanged={(page) => this.handlePageChange(page)}
                        />
                    </div>
                }
            </div>
        );
    }
}

Grid.defaultProps = {
    onStateChanged: () => { },
    onSortChanged: () => { },
    rowClassName: () => { },
    skin: "default",
    enablePaging: false,
    gridData: {
        dataItems: [],
        dataCount: 0,
        pageNumber: 1,
        pageSize:1,
        orderBy: '?',
        orderDir: 'ASC'
    },
    emptyText: "No data available!",
    children: [],
    enableSelection: false,
    onSelectChanged: () => { },
    showSelectionInfo: true,
    isExpandable: false,
    SubGrid: () => { return <></>; }
}

export { Grid, Column };