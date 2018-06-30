import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "../reducers"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["counter", "visibilityFilter"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk))
  let persistor = persistStore(store)
  return { store, persistor }
}
