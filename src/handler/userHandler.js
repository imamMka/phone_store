import { pool } from "../config/db.js";

export const getAllUsersHandler = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM users");

    res.status(200).json({
    status: "success",
    data: users,
    message: "Get all users succesfully",
  });
  } catch (error) {
    console.log(error);
    throw error;
  }

  
};

export const getUsersByIdHandler = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

   if (users.length === 0) {
    res.status(404).json({
      status: "fail",
      message: "User not found",
    });
   };

   res.status(200).json({
    status: "success",
    data: users[0],
    message: "Get user by id succesfully",
   })
  } catch (error) {
    console.log(error);
    throw error;
  }
}