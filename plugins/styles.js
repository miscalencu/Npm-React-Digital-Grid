var plugin = function(state, props) {
    
    var enable = function(props, state) {
        // nothing, because this plugin does not alter the component, just includes the css file
    };

    var apply = function(comp, newState) {
        let { skin } = comp.props;
        console.log("skin", skin); 

        // TO DO: import only once, using localStorage
        // TO DO: import based on the supplied style
        let imports = [];
        imports.push(import('./../styles/common.css'));
        
        if(skin !== 'none') {
            imports.push(import('./../styles/default.css'));
        }
    
        return imports;   
    }

    return {
        apply: apply,
        enable: enable
    };

}();

export {
    plugin
}