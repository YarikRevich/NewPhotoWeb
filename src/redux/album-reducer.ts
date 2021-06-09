import { Dispatch } from "react"
import { Reducers } from "../types";

const initialState = {
    result: [],
    fullMedia: "",
}

type initialStateType = typeof initialState

const albumReducer = (state: initialStateType = initialState, action: Reducers.AlbumReducer.IAlbumActions) => {
    switch (action.type) {
        case Reducers.AlbumReducer.GET_EQUAL_ALBUM_SUCCESS:
            return { ...state, result: action.data }
        case Reducers.AlbumReducer.GET_EQUAL_ALBUM_SUCCESS:
            return { ...state }
        case Reducers.AlbumReducer.GET_FULL_MEDIA_SUCCESS:
            return { ...state, fullMedia: action.data }
        case Reducers.AlbumReducer.GET_FULL_MEDIA_ERROR:
            return { ...state }
    }
    return state
}

export const createGetEqualAlbum = () => (dispatch: Dispatch<Reducers.AlbumReducer.IAlbumActions>) => {

}

const createGetEqualAlbumSuccess = (): Reducers.AlbumReducer.IAlbumActions => {
    return { type: Reducers.AlbumReducer.GET_EQUAL_ALBUM_SUCCESS }
}

const createGetEqualAlbumError = (): Reducers.AlbumReducer.IAlbumActions => {
    return { type: Reducers.AlbumReducer.GET_EQUAL_ALBUM_ERROR }
}


export const createGetFullMedia = () => (dispatch: Dispatch<Reducers.AlbumReducer.IAlbumActions>) => {

}

const createGetFullMediaSuccess = (): Reducers.AlbumReducer.IAlbumActions => {
    return { type: Reducers.AlbumReducer.GET_FULL_MEDIA_SUCCESS }
}

const createGetFullMediaError = (): Reducers.AlbumReducer.IAlbumActions => {
    return { type: Reducers.AlbumReducer.GET_FULL_MEDIA_ERROR }
}


export default albumReducer
