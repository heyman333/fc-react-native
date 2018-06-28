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
    case types.TOGGLE_TODO:
      return state.map(
        todo => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo)
      )
    default:
      return state
  }
}

// const todos = (state = [], action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return [
//         ...state,
//         {
//           id: action.id,
//           text: action.text,
//           completed: false
//         }
//       ]
//     case 'TOGGLE_TODO':
//       return state.map(todo =>
//         (todo.id === action.id)
//           ? {...todo, completed: !todo.completed}
//           : todo
//       )
//     default:
//       return state
//   }
// }
// ​
// export default todos
