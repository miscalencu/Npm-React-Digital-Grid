var plugin = function(grid, state, props) {
    
    const activate = function(grid, props, state) {

        let { skin } = grid.props;
        console.log("skin", skin); 

        // TO DO: import only once, using localStorage
        // TO DO: import based on the supplied style
        let imports = [];
        imports.push(import('./../styles/common.css'));
        
        if(skin !== 'none') {
            imports.push(import('./../styles/default.css'));
        }
    
        // this plugin does not alter the state, just includes the css file
        return {};
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