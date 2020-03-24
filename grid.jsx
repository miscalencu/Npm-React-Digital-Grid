import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      gridClassNames: () => { return ['digital-grid']; },
      footerText: props.footerText
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

    // TO DO: document this as row events parameters /issues/16
    let params = {
      item: item, 
      grid: this
    };

    const { keyField, isExpandable } = this.props;
    let key = keyField ? item[keyField] : index;
    let classNames = this.state.rowClassNames(params);
    
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
        { /* TO DO: move this inside the Expandable plugin /issues/16 */ }
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
        { /* TO DO: move this inside the Expandable plugin /issues/16 */ }
        <ExpandableCell
          isVisible={isExpandable}
          isExpanded={item.isExpanded}
          onExpand={(event) => {
            event.preventDefault();
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
            <FontAwesomeIcon icon={faSync} className='fa-spin mr4' /> Loading data ...
          </td>
        </tr>
      );
    } else {
      if (noData) {
        return (
          <tr key='empty'>
            <td colSpan={this.props.children.length + (isExpandable ? 1 : 0)} align='center'>
              { emptyText }
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
    this.props.onStateChange({
      pageSize: this.props.pageSize,
      pageNr: newPage,
      orderBy: this.props.orderBy,
      orderDir: this.props.orderDir
    });
  }

  handleSortChange(newOrderBy, neworderDir) {
    this.props.onStateChange({
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
    //console.log("DIGITAL GRID - Rendering grid. loading:", this.props.loading, ', data: ', this.state.data ? this.state.data.length: false);
    let columns = this.getColumns();
    let noData = !this.state.data || this.state.data.length === 0;
    let gridClassNames = this.state.gridClassNames();
    gridClassNames.push(`skin-${this.props.skin}`);
    if(this.props.className)
        gridClassNames.push(this.props.className)

    return (
      <>
        <table
          className={gridClassNames.join(' ')}
          style={{ opacity: this.props.loading && !noData ? 0.4 : 1 }}>
          <thead>
            <tr>
              { /* TO DO: move this inside the Expandable plugin /issues/16 */ }
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
          <tbody>
            {this.renderRows(columns)}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={this.props.children.length + (this.props.isExpandable ? 1 : 0)}>
                {this.props.dataCount > this.state.data.length && this.props.pageSize > 0 && (
                  <Paginator
                    pageNr={this.props.pageNr}
                    pageSize={this.props.pageSize}
                    dataCount={this.props.dataCount}
                    onPageChanged={page => this.handlePageChange(page)}
                  />
                )}
                {this.state.footerText}
                {this.props.isSelectable && this.props.showSelectionInfo && (
                <div className='pt10'>
                  <FontAwesomeIcon icon={faInfoCircle} style={{ zoom: 1.2, paddingRight: '5px', float: 'left' }} />
                  <div>
                      Row selection is enabled.
                      <br />
                      Multiselect is also enabled by using the Shift and/or Ctrl keys.
                  </div>
                </div>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    );

  }
}

Grid.defaultProps = {
  emptyText: 'No data available!',              // Text to be displayed when there is no data to available. Defaults to 'No data available'
  footerText: '',                               // Text to be displayed in the bottom of the grid. Defaults to '' (empty).
  className: '',                                // Additional className of the grid table. Defaults to '' (empty).
  classNamesRenderer: () => { return [] },      // Method to compute additional className for each row. Parameters: see row events parameters.
  onCellClick: () => {},                        // Callback method to be called (if set) when clicking a column value.
  emptyPlaceholder: '-',                        // Text to be displayed in each grid cell if the content is empty.

  skin: 'default',                              // Skin of the grid. Can be: 'default', 'classic', 'bootstrap' or 'none'. Defalts to 'default'.

  isSelectable: false,                          // Sets if the grid is selectable. It true, rows can be (multi)selected. Defaults for 'false'.
  showSelectionInfo: true,                      // Sets if the selection info is displayed in the footer of the grid. Defaults for 'false'.
  onSelectionChange: () => {},                  // Callback method called when the selection of the rows changed. Parameters: (selectedKeys, selectedItems, selectedLast)

  isExpandable: false,                          // Sets if the grid is expandable. If 'true' will display in the first column a [+] sign that expands the current row. Defaults to 'false'.
  expandedRowContent: () => { return null; },   // Method used to generate the content of an expanded column. Parameters: (item)

  data: [],                                     // The data that the grid should display.
  keyField: null,                               // The field name of the data elements that represents a unique key.
  loading: false,                               // Sets if the grid should display a loading indicator. Defaults to 'false'.
  dataCount: 0,                                 // The total records of the grid. This is not the count of the 'data' array, but total records for all pages. Used by the paginator to calculate total pages.
  pageNr: 1,                                    // Curtent page to display. Used by the paginator render.
  pageSize: 0,                                  // Current number of items to display on a page. Used by the paginator render.
  orderBy: '?',                                 // Initial 'Order By' field.
  orderDir: 'ASC',                              // Initial 'Order Dir' field.
  onStateChange: () => {}                       // Callback method called when the state of the grid (page, order by, order dir, etc...) is changed. Parameterd: (pageSize, pageNr, orderBy, orderDir).
};

Grid.propTypes = {
  emptyText: PropTypes.string,
  footerText: PropTypes.string,
  className: PropTypes.string,

  classNamesRenderer: PropTypes.func,
  onCellClick: PropTypes.func,
  emptyPlaceholde: PropTypes.string,

  skin: PropTypes.oneOf(['none', 'default', 'classic', 'bootstrap']),

  isSelectable: PropTypes.bool,
  showSelectionInfo: PropTypes.bool,
  onSelectionChange: PropTypes.func,

  isExpandable: PropTypes.bool,
  expandedRowContent: PropTypes.func,

  data: PropTypes.array,
  keyField: PropTypes.string,
  loading: PropTypes.bool,
  dataCount: PropTypes.number,
  pageNr: PropTypes.number,
  pageSize: PropTypes.number,
  orderBy: PropTypes.string,
  orderDir: PropTypes.string,
  onStateChange: PropTypes.func
}

export { Grid, Column };
