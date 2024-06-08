import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import RootReducer from "./reducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};
 
const persistedReducer = persistReducer(persistConfig, RootReducer);

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(persistedReducer, composeWithDevTools(middleware));
const persistor = persistStore(store);

export { store, persistor };
