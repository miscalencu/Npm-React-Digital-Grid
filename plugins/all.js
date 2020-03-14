import * as _styles from './styles';
import * as _selection from './selection'

var plugins = function(component) {

    var enableAll = function(component) {
        let plugins = [
            _styles.plugin
        ];

        plugins.forEach(plugin => {
            plugin.apply(component, plugin.enable(component.props, component.state))
        });
    };

    return {
        enableAll: enableAll        
    };
}();

export {
    _styles,
    _selection,
    plugins
}
