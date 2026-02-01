import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/users.routes.js'

const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

