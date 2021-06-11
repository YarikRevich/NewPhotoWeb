import { Dispatch } from "react"
import { deleteAlbum } from "../api/equalalbum";
import { Reducers } from "../types";

const initialState = {
    result: [],
    fullMedia: "",
    goBack: false
}

type initialStateType = typeof initialState

const EqualAlbumReducer = (state: initialStateType = initialState, action: Reducers.EqualAlbumReducer.IEqualAlbumActions) => {
    switch (action.type) {
        case Reducers.EqualAlbumReducer.ADD_TO_ALBUM_SUCCESS:
            return { ...state }
        case Reducers.EqualAlbumReducer.ADD_TO_ALBUM_ERROR:
            return { ...state }
        case Reducers.EqualAlbumReducer.DELETE_ALBUM_SUCCESS:
            return { ...state }
        case Reducers.EqualAlbumReducer.DELETE_ALBUM_ERROR:
            return { ...state }
        case Reducers.EqualAlbumReducer.GET_EQUAL_ALBUM_SUCCESS:
            return { ...state, result: action.data }
        case Reducers.EqualAlbumReducer.GET_EQUAL_ALBUM_SUCCESS:
            return { ...state }
        case Reducers.EqualAlbumReducer.GET_FULL_MEDIA_SUCCESS:
            return { ...state, fullMedia: action.data }
        case Reducers.EqualAlbumReducer.GET_FULL_MEDIA_ERROR:
            return { ...state }
        case Reducers.EqualAlbumReducer.TURN_ON_GO_BACK:
            return { ...state, goBack: true }
        case Reducers.EqualAlbumReducer.TURN_OFF_GO_BACK:
            return { ...state, goBack: false }
    }
    return state
}

export const createTurnOnGoBack = (): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.EqualAlbumReducer.TURN_ON_GO_BACK }
}

export const createTurnOffGoBack = (): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.EqualAlbumReducer.TURN_OFF_GO_BACK }
}

export const createDeleteAlbum = (albumName: string) => async (dispatch: Dispatch<Reducers.EqualAlbumReducer.IEqualAlbumActions>) => {
    dispatch(createTurnOnGoBack())
    const r = await deleteAlbum(albumName)
    if (r) {
        dispatch(createDeleteAlbumSuccess())
    } else {
        dispatch(createDeleteAlbumError())
    }
    dispatch(createTurnOffGoBack())
}

const createDeleteAlbumSuccess = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.DELETE_ALBUM_SUCCESS }
}

const createDeleteAlbumError = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.DELETE_ALBUM_ERROR }
}


export const createGetEqualAlbum = (albumName: string) => (dispatch: Dispatch<Reducers.EqualAlbumReducer.IEqualAlbumActions>) => {

}

const createGetEqualAlbumSuccess = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.GET_EQUAL_ALBUM_SUCCESS }
}

const createGetEqualAlbumError = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.GET_EQUAL_ALBUM_ERROR }
}


export const createGetFullMedia = () => (dispatch: Dispatch<Reducers.EqualAlbumReducer.IEqualAlbumActions>) => {

}

const createGetFullMediaSuccess = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.GET_FULL_MEDIA_SUCCESS }
}

const createGetFullMediaError = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.GET_FULL_MEDIA_ERROR }
}

export const createAddToAlbums = () => async (dispatch: Dispatch<Reducers.EqualAlbumReducer.IEqualAlbumActions>) => {

}


export default EqualAlbumReducer
