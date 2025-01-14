import express from 'express';
import 'dotenv/config';
import mealsRouter from './mealsRouter.js';

const app = express();

app.use(express.json());
app.use('/api/meals', mealsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
