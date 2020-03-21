import * as _styles from './styles';
import * as _selection from './selection'
import * as _expandable from './expandable'

var plugins = function() {

    let plugins = [
        _styles.plugin,
        _selection.plugin,
        _expandable.plugin
    ];

    var initAll = function(grid, state) {        
        // extract props and state from initial grid
        let { props } = grid;
        
        // alter state by each plugin
        plugins.forEach(plugin => {
            if(plugin.enabled) {
                // get the new state values form plugin
                let alteredState = plugin.activate(grid, props, state);
                // preserve inital events from prior plugins or default functionality
                let mixedState = preservePriorEvents(alteredState, state);
                // return new state object to main component
                state = Object.assign(state, mixedState);
            }
        });

        // return final state
        return state;
    };

    var preservePriorEvents = function(alteredState, state) {
        let newState = Object.assign({}, alteredState);
        let prevState = Object.assign({}, state);
        
        let eventsToPreserve = [
            'onRowClick',
            'onRowMouseOver',
            'onRowMouseOut',
            'onRowMouseDown'
        ];

        eventsToPreserve.forEach(eventToPreserve => {
            if(newState[eventToPreserve]) {
                alteredState[eventToPreserve] = (args) => {
                    prevState[eventToPreserve](args);
                    newState[eventToPreserve](args);
                };
            }
        });

        // return final state with prior events preserved
        return alteredState;
    }

    return {
        initAll: initAll
    };
}();

export {
    plugins
}
