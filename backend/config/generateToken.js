import jwt from 'jsonwebtoken'
import { redisClient } from '../index.js';

export const generateToken = async (id, res) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1m",
    });

    const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, {
        expiresIn: "7d",
    });

    const refreshTokenKey = `refresh_token:${id}`;

    await redisClient.setEx(refreshTokenKey, 7*24*60*60, refreshToken);

    res.cookie("accessToken", accessToken, {
        httpOnly: true, // only backend can read. we cannot access cookie value by doing 'document.cookie' in frontend
        // secure: true, // true -> only works in https not in http
        sameSite: "strict", // strict -> prevents CSRF attack
        maxAge: 1 * 60 * 1000, // 1 min
    });

    // 'refreshToken' should never be read from the frontend
    res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: "none",
        // secure: true,
    });

    return { accessToken, refreshToken };
}

export const verifyRefreshToken = async (refreshToken) => {
    try {
        const decode = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

        const storedToken = await redisClient.get(`refresh_token:${decode.id}`);

        if (storedToken == refreshToken) {
            return decode;
        }
        return null;
        
    } catch (error) {
        return null;
    }
}

export const generateAccessToken = (id, res) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1m',
    });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        // secure: true,
        sameSite: "strict",
        maxAge: 1 * 60 * 1000, // 1 min
    });
}

export const revokeRefreshToken = async(userId) => {
    await redisClient.del(`refresh_token:${userId}`);
}

