import React, {Fragment} from "react"
import './App.css';


import InputTodo from "./components/InputTodo.js"
import ListTodos from "./components/ListTodos.js"

export default function App() {
  return (
    <Fragment>
      <InputTodo className="container"/>
      <ListTodos />
    </Fragment>
  )

}

