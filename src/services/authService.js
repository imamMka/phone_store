import { id } from "zod/locales";

export const register = async (request) => {
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = request;
  

  const [result] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role, address, phone_number, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [fullname, username, email, password, role, address, phone_number, age]
  );

  const newUser = {
    id: result.insertId,
    fullname,
    username,
    email,
    role,
    address,
    phone_number,
    age,
  };

  return newUser;
};
