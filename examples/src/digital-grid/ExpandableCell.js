import React from 'react';
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ExpandableCell = ({
  isVisible = false,
  isExpanded = false,
  onExpand = () => {}
}) => {
  return (
    isVisible && (
      <td>
        <span className='link' onClick={onExpand}>
          <FontAwesomeIcon icon={isExpanded ? faMinusSquare : faPlusSquare} />
        </span>
      </td>
    )
  );
};

export default ExpandableCell;
