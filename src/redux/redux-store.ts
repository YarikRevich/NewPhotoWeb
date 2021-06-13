import { createStore, combineReducers, Reducer, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import mediaReducer from "./media-reducer";
import albumsReducer from "./albums-reducer";
import albumReducer from "./equalalbum-reducer";
import accountReducer from "./account-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer"


let reducers = combineReducers<Reducer>({
    mediaPage: mediaReducer,
    equalAlbumPage: albumReducer,
    albumsPage: albumsReducer,
    accountPage: accountReducer,
    authentication: authReducer,
    app: appReducer
})


export let store = createStore(reducers, applyMiddleware(thunk));
