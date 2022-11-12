const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db.js")

// middleware
app.use(cors())
app.use(express.json()) // gives us access to request.body to get JSON data

app.listen(5000, () => {
    console.log("server has started on port 5000")
})

// ROUTES

// create a todo
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        // $1 refers to the 1st argument in the argument array provided as the 2nd argument
        // to pool.query();
        const newTodo = await pool.query("INSERT INTO todo VALUES(DEFAULT, $1) RETURNING *", [description])

        res.json(newTodo.rows[0]) // the rows property is the important one, and theres only one object in rows
    } catch (err) {
        console.error(err.message)
    }
})

// get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// get a todos
app.get("/todos/:id", async (req, res) => { // can put whatever you want instead of id, the colon gives
    // access to req.params
    try {
        const {id} = req.params
        const requestedTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(requestedTodo.rows[0])
    } catch(err) {
        console.error(err.message)
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {description} = req.body
        const updatedTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
            [description, id])
        
        res.json(updatedTodo.rows[0])
    } catch(err) {
        console.error(err.message)
    }
})

// delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])

        res.json("Todo was deleted!")
    } catch(err) {
        console.error(err.message)
    }
})
