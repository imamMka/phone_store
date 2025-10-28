import z from "zod";

export const createUserSchema = z.object({
    fullname: z.string().min(5, "Fullname must be at least 5 characters long"),
    username: z.string().min(5, "Username must be at least 5 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    role: z.enum(["admin", "user"], "Role must be either 'admin' or 'user'"),
    address: z.string().max(200).optional(),
    phone_number: z.string().min(10).max(15).optional(),
    age: z.number().min(0).optional()
});

export const updateUserSchema = z.object({
    fullname: z.string().min(3).max(100).optional(),
    username: z.string().min(3).max(50).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["admin", "user"]).optional(),
    address: z.string().max(200).optional(),
    phone_number: z.string().min(10).max(15).optional(),
    age: z.number().min(0).optional()
})