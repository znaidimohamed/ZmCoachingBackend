"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const notFoundHandler = (req, res) => {
    res.status(404).json({
        message: `Route not found: ${req.originalUrl}`
    });
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (error, _req, res, _next) => {
    res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error"
    });
};
exports.errorHandler = errorHandler;
