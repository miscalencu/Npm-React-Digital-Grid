import React from 'react';

export default function GridCell(props) {

    const renderCell = () => {
        const handleOnCellClick = (dataField, valPlain, dataItem, ev) => {
            props.onCellClick(dataField, valPlain, dataItem);
            ev.preventDefault();
        };

        let dataItem = props.dataItem;
        let valPlain = dataItem[props.dataField];

        let valFormatted = valPlain;
        if (props.renderer) {
            valFormatted = props.renderer(dataItem);
        }

        if (props.isClickable && (valPlain !== "" || props.renderer)) {
            valFormatted = (
                <span class="link" onClick={(ev) => handleOnCellClick(props.dataField, valPlain, dataItem, ev)}>
                    {valFormatted}
                </span>
            );
        }

        if (valFormatted === "") {
            if (props.emptyPlaceholder !== "")
                valFormatted = props.emptyPlaceholder;
        }

        return valFormatted;
    };

    return (
        <td className={props.className}>
            {renderCell()}
            {props.children}
        </td>
    );
}

GridCell.defaultProps = {
    onCellClick: () => { }
}