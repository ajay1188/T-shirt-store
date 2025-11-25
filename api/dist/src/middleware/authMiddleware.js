"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
const isAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'ADMIN') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};
exports.isAdmin = isAdmin;
