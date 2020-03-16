var plugin = function(grid, state, props) {
    
    var enable = function(grid, props, state) {

        let { skin } = grid.props;
        console.log("skin", skin); 

        // TO DO: import only once, using localStorage
        // TO DO: import based on the supplied style
        let imports = [];
        imports.push(import('./../styles/common.css'));
        
        if(skin !== 'none') {
            imports.push(import('./../styles/default.css'));
        }
    
        // this plugin does not alter the component, just includes the css file
        // so just return same state
        return state;
    };

    return {
        enable: enable
    };

}();

export {
    plugin
}