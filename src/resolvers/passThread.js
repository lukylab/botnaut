/*
 * @author David Menger
 */
'use strict';

const Router = require('../Router');

let handlebars;
try {
    handlebars = module.require('handlebars');
} catch (er) {
    handlebars = null;
}

function passThread ({ appId }, { isLastIndex }) {

    const appIdTemplate = handlebars
        ? handlebars.compile(appId || '{{defaultPassThreadAppId}}')
        : () => appId;

    return (req, res) => {
        const toAppId = appIdTemplate(req.state);
        res.passThread(toAppId);

        return isLastIndex ? Router.END : Router.CONTINUE;
    };
}

module.exports = passThread;
