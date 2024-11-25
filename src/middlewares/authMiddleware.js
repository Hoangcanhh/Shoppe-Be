import { StatusCodes } from 'http-status-codes';
import { JwtProvider, ACCESS_TOKEN_SECRET_SIGNATURE } from '~/providers/JwtProvider';

const isAuthorized = async (req, res, next) => {
    const accessTokenFromHeader = req.headers.authorization?.split(' ')[1];

    if (!accessTokenFromHeader) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'You are not authorized to access this resource!' });
        return;
    }

    try {
        const accessTokenDecoded = await JwtProvider.verifyToken(accessTokenFromHeader, ACCESS_TOKEN_SECRET_SIGNATURE);
        req.jwtDecoded = accessTokenDecoded;
        next();
    } catch (error) {
        console.log('error from authMiddleWare: ', error);

        if (typeof error.message === 'string' && error.message.includes('jwt expired')) {
            res.status(StatusCodes.GONE).json({ message: 'need to refresh token' });
            return;
        }

        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'You are not authorized to access this resource!' });
    }
};

export const authMiddleware = { isAuthorized };
