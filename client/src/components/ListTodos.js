import React, {Fragment} from "react"
import EditTodo from "./EditTodo.js"

export default function ListTodos() {

    const [todos, setTodos] = React.useState([])

    async function getTodos() {
        try {
            const response = await fetch("http://localhost:5000/todos") 
            // default HTTP method for fetch is GET
            const jsonData = await response.json();

            setTodos(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }

    async function deleteTodo(id) {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            })
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.error(error.message)
        }
    }

    React.useEffect(() => getTodos(), []);

    const todoRows = todos.map(todo => {
        return (
            <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td><EditTodo todo={todo}/></td>
                <td>
                    <button 
                    className="btn btn-danger" 
                    onClick={() => deleteTodo(todo.todo_id)}>
                        Delete
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todoRows}
                </tbody>
            </table>
        </Fragment>

    )
}