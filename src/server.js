import express from 'express';
import { testConnection } from './config/db.js';
import userRouter from './routes/userRoute.js';

const app = express();

const port = 3000;
app.use(express.json());

app.use(userRouter);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    testConnection();
})
