var plugin = function() {
    const activate = function(grid, props, state) {
        return {
            data: addIsExpandedColumn(props),
        };
    };

    const addIsExpandedColumn = function(props) {
        return props.isExpandable ? props.data.map(item => ({ ...item, isExpanded: false })) : props.data;
    };

    return {
        name: "Expandable Plugin",
        enabled: true,
        activate: activate
    };

}();

export {
    plugin
}