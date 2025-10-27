import * as UserService from "../services/userService.js";

export const getAllUsersHandler = async (req, res, next) => {
    try {
        const res = await UserService.getAllUser();

        res.status(200).json({
            status: "success",
            data: res,
            message: "Get all users succesfully",
        });
    } catch (error) {
        next(error);
    }
};

export const getUsersByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const res = await UserService.getUserById(id);
        res.status(200).json({
            status: "success",
            data: res,
            message: "Get user by ID successfully",
        });
    } catch (error) {
        next(error)
    }
};
