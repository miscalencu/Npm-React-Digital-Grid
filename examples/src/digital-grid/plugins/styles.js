// TO DO: import only once, using localStorage
// TO DO: import based on the supplied style
function importStyles(style) {
    return [
        import('./../styles/common.css'),
        import('./../styles/default.css')
    ];
}

export {
    importStyles
}