import React from 'react';

export default function Cell(props) {

    const renderCell = () => {
        const handleOnClick = (field, valPlain, dataItem, ev) => {
            props.onClick(field, valPlain, dataItem);
            ev.preventDefault();
        };

        let data = props.data;
        let valPlain = data[props.field];

        let valFormatted = valPlain;
        if (props.renderer) {
            valFormatted = props.renderer(data);
        }

        if (props.isClickable && (valPlain !== "" || props.renderer)) {
            valFormatted = (
                <span class="link" onClick={(ev) => handleOnClick(props.field, valPlain, data, ev)}>
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

Cell.defaultProps = {
    onClick: () => { }
}