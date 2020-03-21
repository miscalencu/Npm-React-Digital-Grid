import React, { Component } from 'react';
import Paginator from './paginator';
import Header from './header';
import Column from './column';
import Cell from './cell';
import ExpandableCell from './expandableCell';

import { faSync, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { plugins } from './plugins/all';

class Grid extends Component {
  constructor(props) {
    super(props);
    // set final state
    this.state = this.buidState(props);
  }

  buidState(props) {
    // prepare default state variable
    // all these items can be altered by the plugins
    let state = {
      data: props.data,                               // data that will be displayed by the grid

      onRowClick : () => {},                          // event invoked when a row is clicked
      onRowMouseOver: () => {},
      onRowMouseOut: () => {},
      onRowMouseDown: () => {},
      rowClassNames: (args) => props.classNamesRenderer(args),
    };

    // enable plugins that change initial state
    return plugins.initAll(this, state);
  }

  componentDidUpdate(prevProps, prevState) {
    // refresh the state every time there is new data sent
    if(JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      let _state = this.buidState(this.props);
      // reset state if different
      if(JSON.stringify(_state) !== JSON.stringify(prevState)) {
        this.setState(_state);
      }
    }
  }

  itemContent(item, index) {

    // TO DO: document this as row events parameters
    let params = {
      item: item, 
      grid: this
    };

    const { keyField, isExpandable } = this.props;
    let key = keyField ? item[keyField] : index;
    let classNames = [ ...this.state.rowClassNames(params) ];
    
    return (
      <React.Fragment 
        key={key}>
        <tr
          className={classNames.join(' ')}
          onClick={(event) => this.state.onRowClick({ event:event, ...params })}
          onMouseDown={(event) => this.state.onRowMouseDown({ event:event, ...params })}
          onMouseOver={(event) => this.state.onRowMouseOver({ event:event, ...params })}
          onMouseOut={(event) => this.state.onRowMouseOut({ event:event, ...params })}>
          {this.rowContent(item)}
        </tr>
        { /* TO DO: move this inside the Expandable plugin */ }
        {isExpandable && item.isExpanded && (
          <tr>
            <td> </td>
            <td colSpan={this.props.children.length}>
              {React.cloneElement(this.props.expandedRowContent(item), {
                data: item
              })}
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  }

  rowContent(item) {

    let children = this.getColumns();
    const { isExpandable } = this.props;
    const { data } = this.state;

    return (
      <>
        { /* TO DO: move this inside the Expandable plugin */ }
        <ExpandableCell
          isVisible={isExpandable}
          isExpanded={item.isExpanded}
          onExpand={() => {
            const copyItems = [...data];
            const index = copyItems.indexOf(item);
            copyItems[index] = { ...copyItems[index] };
            copyItems[index].isExpanded = !copyItems[index].isExpanded;
            this.setState({ data: copyItems });
          }}
        />
        {React.Children.map(children, (child, i) => {
          return (
            <Cell
              {...child.props}
              data={item}
              onCellClick={this.props.onCellClick}
              emptyPlaceholder={this.props.emptyPlaceholder}
            />
          );
        })}
    </>
    );
  }

  renderRows(columns) {
    const { emptyText, isExpandable, loading } = this.props;
    const { data } = this.state;
    let noData = !data || data.length === 0;

    if (loading && noData) {
      return (
        <tr key='loading'>
          <td
            colSpan={this.props.children.length + (isExpandable ? 1 : 0)}
            align='center'
            className='bold'>
            <FontAwesomeIcon icon={faSync} className='fa-spin mr-3' /> Loading data ...
          </td>
        </tr>
      );
    } else {
      if (noData) {
        return (
          <tr key='empty'>
            <td colSpan={this.props.children.length + (isExpandable ? 1 : 0)} align='center'>
              {emptyText}
            </td>
          </tr>
        );
      } else {
        return data.map((item, index) => {
          return this.itemContent(item, index);
        });
      }
    }
  };

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

  getColumns() {
    const children = [];
    const validType = child => {
      return React.isValidElement(child) && child.type === Column;
    };

    // allow only valid Columns in main collection and inside it (in case we have an empty container)
    React.Children.toArray(this.props.children).map(child => {
      if (validType(child)) {
        children.push(child);
      } else {
        if (React.isValidElement(child) && child.props.children) {
          React.Children.toArray(child.props.children).map(subChild => {
            if (validType(subChild)) {
              children.push(subChild);
            }

            return null;
          });
        }
      }

      return null;
    });

    return children;
  }

  render() {

    console.log("Rendering grid...");

    let columns = this.getColumns();
    let noData = !this.state.data || this.state.data.length === 0;

    return (
      <div className={`digital-grid-wrapper${this.props.skin ? ` skin-${this.props.skin}` : ``}`}>
        <table
          className={this.props.className + ' digital-grid ' + ((this.props.skin === 'bootstrap') ? 'table': '')}
          style={{ opacity: this.props.loading && !noData ? 0.4 : 1 }}>
          <thead>
            <tr>
              <th
                key='emptyHeader'
                style={this.props.isExpandable && columns.length >= 1 ? {} : { display: 'none' }}>
              </th>
              {React.Children.map(columns, (column, i) => {
                return (
                  <Header
                    {...column.props}
                    orderBy={this.props.orderBy}
                    key={i}
                    orderDir={this.props.orderDir}
                    onSortChanged={(orderBy, orderDir) => this.handleSortChange(orderBy, orderDir)}
                  />
                );
              })}
            </tr>
          </thead>
          <tbody>{this.renderRows(columns)}</tbody>
        </table>
        {this.props.dataCount > this.state.data.length && this.props.pageSize > 0 && (
          <Paginator
            pageNr={this.props.pageNr}
            pageSize={this.props.pageSize}
            dataCount={this.props.dataCount}
            onPageChanged={page => this.handlePageChange(page)}
          />
        )}
        {this.props.isSelectable && this.props.showSelectionInfo && (
        <p>
          <FontAwesomeIcon icon={faInfoCircle} style={{ zoom: 1.2, paddingRight: '5px', float: 'left' }} />
          <div>
              Row selection is enabled.
              <br />
              Multiselect is also enabled by using the Shift and/or Ctrl keys.
          </div>
        </p>
        )}
      </div>
    );
  }
}

Grid.defaultProps = {
  skin: 'default',                  //
  className: '',                    // className of the grid table
  classNamesRenderer: () => { return [] },      // 

  onStateChanged: () => {},
  isSelectable: false,
  showSelectionInfo: true,

  data: [],
  dataCount: 0,
  pageNr: 1,
  pageSize: 0,
  orderBy: '?',
  orderDir: 'ASC',
  emptyText: 'No data available!',
  isExpandable: false,
  expandedRowContent: () => {
    return <></>;
  }
};

export { Grid, Column };
