import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "../reducers"
import thunk from "redux-thunk"

// const composeEnhancers = composeWithDevTools({
//   //
// })
// const store = createStore(rootReducer, applyMiddleware(thunk))
export default createStore(rootReducer, applyMiddleware(thunk))
