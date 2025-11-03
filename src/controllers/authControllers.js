import * as AuthService from '../services/authService.js';

export const registerHandler = async (req, res, next) => {
    try{
        const response = await AuthService.register();
    } catch (error) {
        next(error);
    }
}