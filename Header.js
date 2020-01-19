import React, { Component } from 'react';

export default class Header extends Component {

    handleSortChange() {
        let isCurrent = (this.props.field === this.props.orderBy);
        this.props.onSortChanged(this.props.field, !isCurrent ? 'ASC' : (this.props.orderDir === 'ASC') ? 'DESC' : 'ASC');
    }

    renderHeaderContent() {
        if (this.props.sortable) {
            const styles = {
                icon: (this.props.field === this.props.orderBy) ? ((this.props.orderDir === "DESC") ? "caret-down" : "caret-up") : "sort",
                container: {
                    color: (this.props.field === this.props.orderBy) ? "#344050" : "lightgray"
                }
            };
            
            // fix to center-align the sortable header
            let tableClass = '';
            if (this.props.className === "text-center") {
                tableClass = 'mx-auto';
            }

            return (
                <table className={'grid-sort-link ' + tableClass} onClick={() => this.handleSortChange()}>
                    <tbody>
                        <tr>
                            <td>
                                {this.props.header}
                            </td>
                            <td className="align-middle">
                                [icon:{styles.icon} style:{styles.container}]
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        }
        else {
            return this.props.header;
        }
    }

    render() {
        return (
            <th
                className={`${this.props.className} grid-header-cell ${this.props.headerClassName}`}
                title={this.props.toolTip + (this.props.toolTip && this.props.sortable ? "\n" : "") + (this.props.sortable ? "Click to sort using this value!" : "")}>
                <div className="gridHeader">
                    {this.renderHeaderContent()}
                </div>
            </th>
        );
    }
}

Header.defaultProps = {
    toolTip: "",
    headerClassName: '',
    sortable: false,
    className: ''
}