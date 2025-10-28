import * as UserService from "../services/userService.js";

export const getAllUsersHandler = async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers();

        res.status(200).json({
            status: "success",
            data: users,
            message: "Get all users successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const getUsersByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserService.getUserById(id);
        res.status(200).json({
            status: "success",
            data: user,
            message: "Get user by ID successfully",
        });
    } catch (error) {
        next(error)
    }
};

export const addUsersHandler = async (req, res, next) => {
    try {
        const result = await UserService.addUsers(req.body);
        res.status(201).json({
            status: "success",
            data: result,
        })

        res.status(201).json({
            status: "success",
            data: newUser,
            message: "User created successfully",
        })
    } catch (error) {
        next(error)
    }
};

export const updateUsersHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        const updateUser = await UserService.updateUsers(id, userData);

        res.status(200).json({
            status: "success",
            data: updateUser,
            message: "User updated successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUsersHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        await UserService.deleteUsers(id)

        res.status(200).json({
            status: "success",
            message: "User deleted successfully"
        });

    } catch (error) {
        next(error);
    }
}