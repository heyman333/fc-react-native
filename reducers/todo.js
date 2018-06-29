import * as types from "../actions/actionTypes"

export const todo = (state = [], action) => {
  switch (action.type) {
    case types.ADDTODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          complete: false
        }
      ]
    case types.REMOVETODO:
      return state.filter(todo => todo.id !== action.id)
    case types.TOGGLE_TODO:
      return state.map(
        todo => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo)
      )
    default:
      return state
  }
}
