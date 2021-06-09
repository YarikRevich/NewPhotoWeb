import { createStore, combineReducers, Reducer, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import photoReducer from "./photo-reducer";
import albumsReducer from "./albums-reducer";
import albumReducer from "./album-reducer";
import accountReducer from "./account-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer"


let reducers = combineReducers<Reducer>({
    photoPage: photoReducer,
    albumPage: albumReducer,
    albumsPage: albumsReducer,
    accountPage: accountReducer,
    authentication: authReducer,
    app: appReducer
})


export let store = createStore(reducers, applyMiddleware(thunk));
