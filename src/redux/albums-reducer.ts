import React, { Dispatch } from "react";
import { getAlbums, createAlbum } from "../api/albums";
import { Reducers } from "../types";

const initialState = {
    result: [],
    isUpdate: false,
    redirect: {
        isRedirect: false,
        to: ""
    }
}

type initialStateType = typeof initialState

const albumsReducer = (state: initialStateType = initialState, action: Reducers.AlbumsReducer.IAlbumsActions) => {
    switch (action.type) {
        case Reducers.AlbumsReducer.GET_ALBUMS_SUCCESS:
            return { ...state, result: (action.data ? action.data : [])}
        case Reducers.AlbumsReducer.GET_ALBUMS_ERROR:
            return { ...state }
        case Reducers.AlbumsReducer.CREATE_ALBUM_SUCCESS:
            return { ...state, reset: [] }
        case Reducers.AlbumsReducer.CREATE_ALBUM_ERROR:
            return { ...state }
        case Reducers.AlbumsReducer.TURN_ON_UPDATE:
            return { ...state, isUpdate: true }
        case Reducers.AlbumsReducer.TURN_OFF_UPDATE:
            return { ...state, isUpdate: false }
        case Reducers.AlbumsReducer.TURN_ON_REDIRECT:
            return { ...state, redirect: { isRedirect: true, to: action.data } }
        case Reducers.AlbumsReducer.TURN_OFF_REDIRECT:
            return { ...state, redirect: { isRedirect: false, to: "" } }
    }
    return state
}

export const createTurnOnRedirect = (to: string): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.AlbumsReducer.TURN_ON_REDIRECT, data: to }
}

export const createTurnOffRedirect = (): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.AlbumsReducer.TURN_OFF_REDIRECT }
}

export const createTurnOnUpdate = (): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.AlbumsReducer.TURN_ON_UPDATE }
}

export const createTurnOffUpdate = (): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.AlbumsReducer.TURN_OFF_UPDATE }
}

export const createGetAlbums = () => async (dispatch: Dispatch<Reducers.AlbumsReducer.IAlbumsActions>) => {
    const r = await getAlbums()
    if (r && r.ok) {
        dispatch(createGetAlbumsSuccess(r.data))
        dispatch(createTurnOffUpdate())
    } else {
        dispatch(createGetAlbumsError())
    }
    dispatch(createTurnOffUpdate())
}

const createGetAlbumsSuccess = (d: any): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.AlbumsReducer.GET_ALBUMS_SUCCESS, data: d }
}

const createGetAlbumsError = (): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.AlbumsReducer.GET_ALBUMS_ERROR }
}

export const createCreateAlbum = (albumName: string) => async (dispatch: Dispatch<Reducers.AlbumsReducer.IAlbumsActions>) => {
    const r = await createAlbum(albumName)
    if (r) {
        dispatch(createTurnOnUpdate())
        dispatch(createCreateAlbumSuccess())
    } else {
        dispatch(createCreateAlbumError())
    }
    dispatch(createTurnOnUpdate())
}

const createCreateAlbumSuccess = (): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.AlbumsReducer.CREATE_ALBUM_SUCCESS }
}

const createCreateAlbumError = (): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.AlbumsReducer.CREATE_ALBUM_ERROR }
}


export default albumsReducer