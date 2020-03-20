import React, { Component } from 'react';
import Paginator from './paginator';
import Header from './header';
import Column from './column';
import Cell from './cell';
import ExpandableCell from './expandableCell';
import { faSync } from '@fortawesome/free-solid-svg-icons';
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

  renderRows(children) {
    const { emptyText, isExpandable, keyField, loading } = this.props;
    const { data } = this.state;
    let noData = !data || data.length === 0;

    if (loading && noData) {
      return (
        <tr key='loading'>
          <td
            colSpan={this.props.children.length + (isExpandable ? 1 : 0)}
            align='center'
            className='bold'
          >
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
          let key = keyField ? item[keyField] : index;
          let classNames = [];
          classNames.push(this.props.classNameRowRenderer(item));
          let onMouseOver = () => {};
          let onMouseOut = () => {};
          let onMouseDown = () => {};
          let onClick = () => {};
          let isSelected = false;

          if (this.props.isSelectable) {
            isSelected = this.state.selectedKeys.indexOf(key) !== -1;
            if (!isSelected) {
              onMouseOver = event => {
                let tr = event.currentTarget;
                tr.classList.add('grid-selected');
              };
              onMouseOut = event => {
                let tr = event.currentTarget;
                tr.classList.remove('grid-selected');
              };
            }
            onMouseDown = event => {
              if (event.ctrlKey || event.shiftKey) {
                event.preventDefault();
              }
            };
            
            onClick = (event) => { 
              this.state.onRowClick(event, item, this);
            };
          }

          if (isSelected) {
            classNames.push('grid-selected');
          }

          return (
            <React.Fragment key={key}>
              <tr
                className={classNames.join(' ')}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
              >
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
              </tr>
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

  render() {

    console.log("Rendering grid...");

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

    let noData =
      !this.props.gridData ||
      !this.props.gridData.dataItems ||
      this.props.gridData.dataItems.length === 0;

    return (
      <div className={`digital-grid-wrapper${this.props.skin ? ` skin-${this.props.skin}` : ``}`}>
        <table
          className={this.props.className + ' digital-grid ' + ((this.props.skin === 'bootstrap') ? 'table': '')}
          style={{ opacity: this.props.loading && !noData ? 0.4 : 1 }}
        >
          <thead>
            <tr>
              <th
                key='emptyHeader'
                style={this.props.isExpandable && children.length >= 1 ? {} : { display: 'none' }}
              ></th>
              {React.Children.map(children, (child, i) => {
                return (
                  <Header
                    {...child.props}
                    orderBy={this.props.orderBy}
                    key={i}
                    orderDir={this.props.orderDir}
                    onSortChanged={(orderBy, orderDir) => this.handleSortChange(orderBy, orderDir)}
                  />
                );
              })}
            </tr>
          </thead>
          <tbody>{this.renderRows(children)}</tbody>
        </table>
        {this.props.isSelectable && this.props.showSelectionInfo && (
          <div className='text-info p-3'>
            [icon:info]
            <small>
              Row selection is enabled.
              <br />
              Multiselect is also enabled by using the Shift and/or Ctrl keys.
            </small>
          </div>
        )}
        {this.props.dataCount > this.state.data.length && this.props.pageSize > 0 && (
          <Paginator
            pageNr={this.props.pageNr}
            pageSize={this.props.pageSize}
            dataCount={this.props.dataCount}
            onPageChanged={page => this.handlePageChange(page)}
          />
        )}
      </div>
    );
  }
}

Grid.defaultProps = {
  skin: 'default',
  className: '',
  classNameRowRenderer: () => {},

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
