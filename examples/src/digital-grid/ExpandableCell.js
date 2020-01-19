import React from 'react';

import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ExpandableCell(props) {
    const handleOnCellClick = (e) => {
        props.onExpand(props.dataItem);
        e.preventDefault();
    };

    return (
        props.isVisible && <td className={props.className}>
            <span className="link" onClick={(e) => handleOnCellClick(e)}>
                <FontAwesomeIcon icon={props.isExpanded ? faMinusSquare : faPlusSquare} />
            </span>
        </td>
    );
}

ExpandableCell.defaultProps = {
    isExpanded: false,
    onExpand: () => { },
    isVisible: false
}