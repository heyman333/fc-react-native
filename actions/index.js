import * as types from "./actionTypes"

//counter
export const increment = () => {
  return {
    type: types.INCREMENT
  }
}

export const decrement = () => {
  return {
    type: types.DECREMENT
  }
}

//todos
let nextTodoId = 0
export const addTodo = text => ({
  type: types.ADDTODO,
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
})

export const toggleTodo = id => ({
  type: types.TOGGLE_TODO,
  id
})
