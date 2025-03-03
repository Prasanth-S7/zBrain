import jwt from "jsonwebtoken";
export const loginMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }   

    try {
        const splitToken = token.split(' ')[1];
        const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Unauthorized' });
    }
};