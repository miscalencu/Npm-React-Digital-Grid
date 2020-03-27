var plugin = function(grid, state, props) {
    
    const activate = function(grid, props, state) {
        let prevState = Object.assign({}, state);
        // let { skin } = grid.props;
        
        // TO DO: import only once, using localStorage
        // TO DO: import based on the supplied style
        let imports = [];
        imports.push(import('../styles/common.css'));
        
        //if(skin !== 'none') {
            imports.push(import('../styles/default.css'));
            imports.push(import('../styles/classic.css'));
            imports.push(import('../styles/bootstrap.css'));
        //}

        const gridClassNames = (args) => {
            let classNames = prevState.gridClassNames(args);
            let { skin } = grid.props;
            if(skin === 'bootstrap') {
                // add the 'table' class to the existing ones
                classNames.push('table');
            }
            return classNames;
        };
    
        // this plugin does not alter the state, just includes the css file
        return {
            gridClassNames: (args) => gridClassNames(args)
        };
    };

    return {
        name: "Style Plugin",
        enabled: true,
        activate: activate,
    };

}();

export {
    plugin
}