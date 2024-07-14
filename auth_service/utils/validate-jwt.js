import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {
    let token = req.headers['authorization']

    if (!token) {
        return res.status(401).send('A token is required for authentication');
    }

    try {
        token = token.replace(/^Bearer\s+/, '');
        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.user = decoded.userId;
    } catch (e) {
        return res.status(401).send('Invalid Token');
    }

    return next();
};
