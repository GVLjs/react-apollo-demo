import React from "react"
import { withTodos } from "./queries"
import { withAdd, withToggle, withDestroy } from "./mutations"

function _Todo(props) {
  return (
    <div>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={props.toggle}
      />
      {props.title}
      <button onClick={props.destroy}>x</button>
    </div>
  )
}

const Todo = withDestroy(withToggle(_Todo))

function _Input(props) {
  return (
    <input
      type="text"
      onKeyDown={e => {
        if (e.keyCode === 13) {
          props.add(e.target.value)
          e.target.value = ""
        }
      }}
    />
  )
}

const Input = withAdd(_Input)

function _Todos(props) {
  if (!props.todos) return null
  return (
    <ul>
      {props.todos.map(todo => (
        <li key={todo.id}>
          <Todo {...todo} />
        </li>
      ))}
      <Input />
    </ul>
  )
}

const Todos = withTodos(_Todos)

export default Todos
