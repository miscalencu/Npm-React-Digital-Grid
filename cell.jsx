import React from 'react';
import PropTypes from 'prop-types';
export default function Cell(props) {
  const renderCell = () => {
    const handleOnClick = (field, valPlain, dataItem, ev) => {
      props.onCellClick(field, valPlain, dataItem);
      ev.preventDefault();
    };

    let data = props.data;
    let valPlain = data[props.field];

    let valFormatted = valPlain;
    if (props.renderer) {
      valFormatted = props.renderer(data);
    }

    if (props.isClickable && (valPlain !== '' || props.renderer)) {
      valFormatted = (
        <span onClick={ev => handleOnClick(props.field, valPlain, data, ev)}>
          {valFormatted}
        </span>
      );
    }

    if (!valFormatted) {
      if (props.emptyPlaceholder !== '') valFormatted = props.emptyPlaceholder;
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
  onCellClick: () => {},
  isClickable: false
};

Cell.propTypes = {
  onCellClick: PropTypes.func,
  isClickable: PropTypes.bool
}
