import jwt from 'jsonwebtoken'
import { redisClient } from '../index.js';
import { User } from '../models/User.js';

export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(403).json({
                message: "Please login first",
            });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedData) {
            return res.status(400).json({
                message: "token expired",
            });
        }

        const cacheUser = await redisClient.get(`user:${decodedData.id}`)

        if (cacheUser) {
            req.user = JSON.parse(cacheUser);
            return next();
        }

        const user = await User.findById(decodedData.id).select("-password");

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        await redisClient.setEx(`user:${user._id}`, 3600, JSON.stringify(user));

        req.user = user;
        next();

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}