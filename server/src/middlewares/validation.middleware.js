"use strict";
exports.__esModule = true;
exports.validate = void 0;
var validate = function (schema) {
    return function (req, res, next) {
        var error = schema.validate(req.body).error;
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
exports.validate = validate;
