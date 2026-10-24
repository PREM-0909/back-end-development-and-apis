export function inputCleaner(req, res, next) {
    if (req && req.body) {
        if (typeof req.body.username === 'string') {
            req.body.username = req.body.username.toLowerCase();
        }
        if (typeof req.body.comment === 'string') {
            req.body.comment = req.body.comment.replace(/<[^>]*>/g, "");
        }
    }
    if (typeof next === 'function') {
        next();
    }
}

export function inputValidator(req, res, next) {
    if (req && req.body && typeof req.body.username === 'string' && req.body.username.length >= 3) {
        if (typeof next === 'function') {
            return next();
        }
    }
    if (res && typeof res.redirect === 'function') {
        return res.redirect('/form?error=Username must be at least 3 characters.');
    }
}