import { Dispatch } from "react"
import { addMediaToAlbum, deleteAlbum, getEqualAlbum } from "../api/equalalbum";
import { createTurnOnUpdate as cTonU, createTurnOffUpdate as cToffU } from "./albums-reducer"
import { getFullMedia } from "../api/media";
import { Reducers, SentData } from "../types";

const initialState = {
    result: {
        photos: [],
        videos: [],
    },
    isUpdate: false,
    fullMedia: {
        isShown: false,
        src: "",
    },
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
            return { ...state, result: { photos: (action.data.photos ? action.data.photos : []), videos: (action.data.photos ? action.data.photos : []) } }
        case Reducers.EqualAlbumReducer.GET_EQUAL_ALBUM_SUCCESS:
            return { ...state }
        case Reducers.EqualAlbumReducer.TURN_ON_UPDATE:
            return { ...state, isUpdate: true }
        case Reducers.EqualAlbumReducer.TURN_OFF_UPDATE:
            return { ...state, isUpdate: false }
        case Reducers.EqualAlbumReducer.TURN_ON_FULL_MEDIA:
            return { ...state, fullMedia: { isShown: true, src: action.data } }
        case Reducers.EqualAlbumReducer.TURN_OFF_FULL_MEDIA:
            return { ...state, fullMedia: { isShown: false, src: "" } }
        case Reducers.EqualAlbumReducer.TURN_ON_GO_BACK:
            return { ...state, goBack: true }
        case Reducers.EqualAlbumReducer.TURN_OFF_GO_BACK:
            return { ...state, goBack: false }
    }
    return state
}

export const createAddToAlbum = (albumName: string, f: FileList) => async (dispatch: Dispatch<Reducers.EqualAlbumReducer.IEqualAlbumActions>) => {
    const photos: SentData.LoadedMedia = []
    const videos: SentData.LoadedMedia = []

    const v = Array.from(f)
    for (const i of v) {
        await new Promise(resolve => {
            const reader = new FileReader()
            reader.onloadend = () => {
                const f = reader.result?.toString()
                if (f) {
                    const r = {
                        file: f.split(",")[1],
                        name: i.name,
                        size: i.size,
                        extension: i.name.split(".").reverse()[0],
                    }
                    if (i.type.match("image")) {
                        photos.push(r)
                    } else {
                        videos.push(r)
                    }
                }
                resolve(null)
            }
            reader.readAsDataURL(i)
        })
    }

    const r = await addMediaToAlbum("photos", albumName, photos)
    if (r) {
        const r = await addMediaToAlbum("videos", albumName, videos)
        if (r) {
            dispatch(createAddToAlbumSuccess())
        }
    } else {
        dispatch(createAddToAlbumError())
    }
    dispatch(createTurnOnUpdate())
}


export const createTurnOnUpdate = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.TURN_ON_UPDATE }
}

export const createTurnOffUpdate = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.TURN_OFF_UPDATE }
}

const createAddToAlbumSuccess = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.ADD_TO_ALBUM_SUCCESS }
}

const createAddToAlbumError = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.ADD_TO_ALBUM_ERROR }
}

export const createTurnOnGoBack = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
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
    dispatch(createTurnOnUpdate())
}

const createDeleteAlbumSuccess = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.DELETE_ALBUM_SUCCESS }
}

const createDeleteAlbumError = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.DELETE_ALBUM_ERROR }
}


export const createGetEqualAlbum = (albumName: string, offset: number, page: number) => async (dispatch: Dispatch<Reducers.EqualAlbumReducer.IEqualAlbumActions>) => {
    const r = await getEqualAlbum(albumName, offset, page)
    if (r && r.ok) {
        dispatch(createGetEqualAlbumSuccess(r.data))
    } else {
        dispatch(createGetEqualAlbumError())
    }
    dispatch(createTurnOffUpdate())
}

const createGetEqualAlbumSuccess = (data: any): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.GET_EQUAL_ALBUM_SUCCESS, data: data }
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

export const createTurnOnFullMedia = (thumbnail: string) => async (dispatch: Dispatch<Reducers.EqualAlbumReducer.IEqualAlbumActions>) => {
    const r = await getFullMedia("photos", thumbnail)
    if (r && r.ok) {
        dispatch(createTurnOnFullMediaSuccess(r.media))
    } else {
        dispatch(createTurnOnFullMediaError())
    }
}

const createTurnOnFullMediaSuccess = (media: string): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.TURN_ON_FULL_MEDIA, data: media }
}

const createTurnOnFullMediaError = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.TURN_OFF_FULL_MEDIA }
}

export const createTurnOffFullMedia = (): Reducers.EqualAlbumReducer.IEqualAlbumActions => {
    return { type: Reducers.EqualAlbumReducer.TURN_OFF_FULL_MEDIA }
}


export default EqualAlbumReducer
