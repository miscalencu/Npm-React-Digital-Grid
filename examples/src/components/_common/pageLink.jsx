import React from 'react';
import { Link } from 'react-router-dom';

const PageLink = (params) => {
    // use this way of generating the links for the HashRouter
    // the default implementatin has a bug if the react app is inside a virtual folder
    // in this case it also adds the folder name after the hash (#).
    
    const useHash = process.env.REACT_APP_ROUTER_TYPE === "hash";
    return (
        <>
            {useHash && <a href={`${process.env.PUBLIC_URL}/#${params.to}`}>{params.children}</a>}
            {!useHash && <Link to={params.to}>{params.children}</Link>}
        </>
    )
}

export default PageLink;