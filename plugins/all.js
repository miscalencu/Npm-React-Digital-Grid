import * as _styles from './styles';
import * as _selection from './selection'

var plugins = function(grid) {

    let plugins = [
        _styles.plugin,
        _selection.plugin
    ];

    var initAll = function(grid, state) {        
        // extract props and state from initial grid
        let { props } = grid;

        // alter state by each plugin
        plugins.forEach(plugin => {
            state = plugin.enable(grid, props, state);
        });

        // return final state
        return state;
    };

    return {
        initAll: initAll
    };
}();

export {
    plugins
}
