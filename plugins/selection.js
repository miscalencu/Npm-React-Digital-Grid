var plugin = function() {
    const name = "Selection Plugin";
    const activate = function(grid, props, state) {

        let prevState = Object.assign({}, state);

        if(!props.isSelectable)
            return {};

        const { keyField } = props;

        if(!keyField) {
            console.error(`DIGITAL GRID - You cannot use PLUGIN ${name} when you don't have a keyField defined.`)
        }
        
        const isSelected = (item) => {
            return grid.state.selectedKeys.indexOf(item[keyField]) !== -1
        };

        const rowClassNames = (args) => {
            let { item } = args;
            let classNames = prevState.rowClassNames(args);
            if(isSelected(item)) {
                // add the 'grid-selected' class to the existing ones
                classNames.push('grid-selected');
            }
            return classNames;
        };
        const onMouseOver = (args) => {
            let { event, item } = args;
            if(!isSelected(item)) {
                let tr = event.currentTarget;
                tr.classList.add('grid-selected');
                }
            }
            const onMouseOut = (args) => {
            let { event, item } = args;
            if(!isSelected(item)) {
                let tr = event.currentTarget;
                tr.classList.remove('grid-selected');
            }
        };
        const onMouseDown = (args) => {
            let { event } = args;
            if (event.ctrlKey || event.shiftKey) {
                event.preventDefault();
            }
        };

        return {
            selectedKeys: [],
            selectedItems: [],
            selectedLast: null,
            onRowClick: (args) => onRowClick(args),
            onRowMouseOver: (args) => onMouseOver(args),
            onRowMouseOut: (args) => onMouseOut(args),
            onRowMouseDown: (args) => onMouseDown(args),
            rowClassNames : (args) => rowClassNames(args)
        };
    };

    let onRowClick = (args) => {
        let { event, item, grid } = args;
        let { keyField } = grid.props;
        let key = keyField ? item[keyField] : 0;

        let selectionResult = toggleSelectRow(event, key, grid.props, grid.state);
        grid.setState(selectionResult);

        if(grid.props.onSelectChanged)
            grid.props.onSelectChanged(selectionResult);
    }

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

    return {
        name: name,
        enabled: true,
        activate: activate
    };
}();

export {
    plugin
}