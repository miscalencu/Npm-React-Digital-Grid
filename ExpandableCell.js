import React from 'react';

export default function ExpandableCell(props) {
    const handleOnCellClick = (e) => {
        props.onExpand(props.dataItem);
        e.preventDefault();
    };

    let iconName = props.isExpanded ? "minus-square" : "plus-square";
    return (
        props.isVisible && <td className={props.className}>
            <span className="link" onClick={(e) => handleOnCellClick(e)}>
                [icon:{iconName}]
            </span>
        </td>
    );
}

ExpandableCell.defaultProps = {
    isExpanded: false,
    onExpand: () => { },
    isVisible: false
}