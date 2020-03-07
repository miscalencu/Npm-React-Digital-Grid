import React from 'react';
import { Redirect } from 'react-router-dom';

const PageRedirect = (params) => {
    // use this way of redirecting for the HashRouter
    // the default implementatin has a bug if the react app is inside a virtual folder
    // in this case it also adds the folder name after the hash (#).
    
    const useHash = process.env.REACT_APP_ROUTER_TYPE === "hash";
    if(useHash) {
         const url = `${process.env.PUBLIC_URL}/#${params.to}`;
         document.location.href = url;
         return null; 
    }

    return (
        <>
            {!useHash && <Redirect to={params.to}></Redirect>}
        </>
    )
}

export default PageRedirect;