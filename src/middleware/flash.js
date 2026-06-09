const flash = (req, res, next) => {
    if (!req.session) {
        return next();
    }

    res.locals.messages = req.session.messages || {
        success: [],
        error: [],
        warning: [],
        info: []
    };

    req.flash = (type, message) => {
        if (!req.session.messages) {
            req.session.messages = {
                success: [],
                error: [],
                warning: [],
                info: []
            };
        }

        if (!req.session.messages[type]) {
            req.session.messages[type] = [];
        }

        req.session.messages[type].push(message);
    };

    req.session.messages = {
        success: [],
        error: [],
        warning: [],
        info: []
    };

    next();
};

export default flash;