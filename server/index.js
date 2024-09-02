import express from 'express'
import cors from 'cors'

import pool from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 4000;

// cors accessibility for client server response connection
app.use(cors());

// Access req.body
app.use(express.json());

app.get("/", (req,res) => {
  res.send("Server is running")
})

// create todo
app.post("/todos/insert", async (req, res) => {
  try{
    const { description } = req.body;
    
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]
    );
    // console.log(newTodo);
    res.json(newTodo);
    // res.send("Received");
  }
  catch (err){
    console.log(err);
  }
})

//  get todo
app.get("/todos", async (req, res) => {
  const data = await pool.query(
    "SELECT * FROM todo;"
  )
  res.send(data.rows)
})

// update todo
app.put("/todos/update/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  try {
    const { id } = req.params;
    const { description } = req.body;
    const uptodo = await pool.query(
      `UPDATE todo SET description = $1 WHERE todo_id = $2`, [description, id]
    );
    res.send(`Updated Todo activity with id:${id}`);
  } catch (err) {
    console.log(err.message)
  }
})

// delete todo
app.delete("/todos/delete", async (req, res) => {
  try {
    const {todo_id} = req.query;
    console.log(todo_id)
    const delquery = await pool.query(
      `DELETE FROM todo WHERE todo_id = ${todo_id};`
    );

    res.send("Deleted");
  }
  catch (err){
    console.error(err);
  }

  // console.log(req.query)
})

app.listen(port, () => {
  console.log(`Server running on : http://localhost:${port}`)
})