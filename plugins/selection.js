function toggleSelectRow(event, key, props, state) {
    let isCtrl = event.ctrlKey;
    let isShift = event.shiftKey;
    
    if (isCtrl || isShift) {
      event.preventDefault(); // this works everywhere, except IE
      document.getSelection().removeAllRanges(); // hack for IE
    }

    var newSelectedKeys = [];
    var newSelectedItems = [];

    // keep existing values if Ctrl is pressed
    if (isCtrl) {
      newSelectedKeys = state.selectedKeys.slice();
      newSelectedItems = state.selectedItems.slice();
    }

    let keyStart = key;
    let keyEnd = key;

    if (isShift) {
      let currentKeys = [];
      props.data.forEach(item => {
        currentKeys.push(item[props.keyField]);
      });
      let posStart = currentKeys.indexOf(state.selectedLast);
      let posEnd = currentKeys.indexOf(keyStart);

      if (posStart < posEnd) {
        keyStart = state.selectedLast;
      } else {
        keyEnd = state.selectedLast;
      }
    }

    let update = false;
    props.data.forEach(item => {
      if (item[props.keyField] === keyStart) 
        update = true;

      if (update) {
        if (newSelectedKeys.indexOf(item[props.keyField]) === -1) {
          newSelectedKeys.push(item[props.keyField]);
          newSelectedItems.push(item);
        } else {
          newSelectedKeys = newSelectedKeys.filter(key => {
            return key !== item[props.keyField];
          });
          if (props.keyField) {
            newSelectedItems = newSelectedItems.filter(selItem => {
              return selItem[props.keyField] !== item.key;
            });
          }
        }
      }

      if (item[props.keyField] === keyEnd) {
        update = false;
      }
    });

    return {
        selectedKeys: newSelectedKeys,
        selectedItems: newSelectedItems,
        selectedLast: key    
    }
  };

  export {
    toggleSelectRow
}