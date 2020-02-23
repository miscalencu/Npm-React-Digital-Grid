// TO DO: import only once, using localStorage
// TO DO: import based on the supplied style
function importStyles(skin) {
    console.log(skin);
    let imports = [];
    imports.push(import('./../styles/common.css'));
    
    if(skin !== 'none') {
        imports.push(import('./../styles/default.css'));
    }

    return imports;
}

export {
    importStyles
}