import express from 'express';
import db from './database.js'; 

const router = express.Router();

// GET all meals
router.get('/', async (req, res) => {
  try {
    const meals = await db.select('*').from('Meal');
    res.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).send('Error retrieving meals from the database');
  }
});

// POST a new meal
router.post('/', async (req, res) => {
  const { title, description, price } = req.body;
  try {
    const [id] = await db('Meal').insert({ title, description, price });
    res.status(201).json({ id, title, description, price });
  } catch (error) {
    res.status(500).send('Error adding the meal to the database');
  }
});

// GET a meal by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const meal = await db('Meal').where({ id }).first();
    if (meal) {
      res.json(meal);
    } else {
      res.status(404).send('Meal not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving the meal from the database');
  }
});

// PUT to update a meal by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  try {
    const updated = await db('Meal').where({ id }).update({ title, description, price });
    if (updated) {
      const updatedMeal = await db('Meal').where({ id }).first();
      res.json(updatedMeal);
    } else {
      res.status(404).send('Meal not found');
    }
  } catch (error) {
    res.status(500).send('Error updating the meal in the database');
  }
});

// DELETE a meal by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db('Meal').where({ id }).del();
    if (deleted) {
      res.status(200).json({ message: "Meal deleted successfully" });
    } else {
      res.status(404).send('Meal not found');
    }
  } catch (error) {
    res.status(500).send('Error deleting the meal from the database');
  }
});

export default router;
