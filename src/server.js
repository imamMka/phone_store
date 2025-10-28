import express from 'express';
import { testConnection } from './config/db.js';
import userRouter from './routes/userRoute.js';
import productsRouter from './routes/productRoute.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import cors from 'cors';

const app = express();

const port = 5000;
app.use(cors())
app.use(express.json());

app.use(productsRouter);
app.use(userRouter);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    testConnection();
})
