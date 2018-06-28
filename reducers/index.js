import { combineReducers } from "redux"
import { counter } from "./counter"
import { todo } from "./todo"
import { visibilityFilter } from "./visibilityFilter"

export default combineReducers({
  counter,
  todo,
  visibilityFilter
})
