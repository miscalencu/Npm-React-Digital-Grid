import React from 'react';
import { faCaretDown, faCaretUp, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({
  toolTip = '',
  classNames = '',
  headerClassName = '',
  sortable = false,
  ...props
}) => {
  const handleSortChange = () => {
    let isCurrent = props.field === props.orderBy;
    props.onSortChanged(
      props.field,
      !isCurrent ? 'ASC' : props.orderDir === 'ASC' ? 'DESC' : 'ASC'
    );
  };

  const renderHeaderContent = () => {
    if (sortable) {
      const styles = {
        icon:
          props.field === props.orderBy
            ? props.orderDir === 'DESC'
              ? faCaretDown
              : faCaretUp
            : faSort,
        class: props.field === props.orderBy ? 'active' : 'inactive'
      };

      return (
        <table className='grid-sort-link' onClick={() => handleSortChange()}>
          <tbody>
            <tr>
              <td className='pr5'>{props.header}</td>
              <td className='align-middle'>
                <FontAwesomeIcon icon={styles.icon} className={styles.class} />
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return props.header;
    }
  };

  return (
    <th
      className={`${props.className} grid-header-cell ${headerClassName}`}
      title={
        toolTip +
        (toolTip && sortable ? '\n' : '') +
        (sortable ? 'Click to sort this using value!' : '')
      }
    >
      <div className='gridHeader'>{renderHeaderContent()}</div>
    </th>
  );
};

export default Header;

Header.defaultProps = {
  className: ''
}
