import { pool } from "../config/db.js";
import { createProductSchema, updateProductSchema } from "../validations/productValidation.js";
import validate from "../validations/validate.js";
export const getAllProductsHandler = async (req, res) => {
  try {
    const [products] = await pool.query(
      "SELECT * FROM products"
    );

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductsByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [products] = await pool.query(
      "SELECT * FROM products WHERE id=?",
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: products[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching the product data.",
    });
  }
};

export const addProductsHandler = async (req, res) => {
  const { user_id, name, description, price, stock } = req.body;

  try {
    const validated = validate(createProductSchema, req.body);

    const [products] = await pool.query(
      "INSERT INTO products (user_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)",
      [validated.user_id, validated.name, validated.description, validated.price, validated.stock]
    );

    const newProduct = {
      id: products.insertId,
      ...validated
    };

    res.status(201).json({
      status: "success",
      message: "product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProductsHandler = async (req, res) => {
 try {
    const { id } = req.params;
    const validated = validate(updateProductSchema, req.body);
    
    const fields = [];
    const values = [];
    
    for (const [key, value] of Object.entries(validated)) {
      fields.push(`${key}=?`);
      values.push(value);
    }
    
    if (fields.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "No valid fields to update"
      });
    }

    values.push(id);
    await pool.query(
      `UPDATE products SET ${fields.join(", ")} WHERE id=?`,
      values
    );

    const [productupdated] = await pool.query(
      "SELECT id, user_id, name, description, price, stock FROM products WHERE id=?",
      [id]
    );

    if (productupdated.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: productupdated[0],
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        status: "fail",
        message: error.message
      });
    }
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};

export const deleteProductsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM products WHERE id=?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};