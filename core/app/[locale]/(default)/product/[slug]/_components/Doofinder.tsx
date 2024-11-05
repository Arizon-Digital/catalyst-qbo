import React, { useEffect } from "react";

const DoofinderScriptLoader = () => {
    useEffect(() => {
        const dfLayerOptions = {
            installationId: 'c0f78410-3a01-422e-bb3d-1a441ec81c85',
            zone: 'eu1'
        };

       
        (function (l, a, y, e, r, s) {
            r = l.createElement(a);
            r.async = 1;
            r.src = y;
            r.onload = function () {
                
                const checkDoofinder = setInterval(() => {
                    if (window.doofinderLoader) {
                        window.doofinderLoader.load(dfLayerOptions);
                        clearInterval(checkDoofinder); 
                    }
                }, 100); 
            };
            s = l.getElementsByTagName(a)[0];
            s.parentNode.insertBefore(r, s);
        })(document, 'script', 'https://cdn.doofinder.com/livelayer/1/js/loader.min.js');

    }, []);

    return (
        <div>
            
        </div>
    );
};

export default DoofinderScriptLoader;
