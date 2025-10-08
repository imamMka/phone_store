// productsRouter.js
import express from "express";
import { getAllProductsHandler, deleteProductsHandler, addProductsHandler, getProductsByIdHandler, updateProductsHandler } from "../handler/productHandler.js";

const productsRouter = express.Router();

productsRouter.get("/products", getAllProductsHandler);
productsRouter.get("/products/:id", getProductsByIdHandler);
productsRouter.post("/products", addProductsHandler);
productsRouter.put("/products/:id", updateProductsHandler);
productsRouter.delete("/products/:id", deleteProductsHandler);

// PASTIKAN INI ADALAH productsRouter
export default productsRouter;