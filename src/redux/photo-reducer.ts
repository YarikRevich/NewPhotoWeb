import React, { Dispatch } from "react";
import { addPhotos, getPhotos } from "../api/photos";
import { Reducers } from "../types";
import type { SentData } from "../types";
import { getFullMedia } from "../api/media";

let initialState = {
    result: [],
    resultByTag: [],
    isUpdate: false,
    fullMedia: {
        isShown: false,
        src: "",
    },
    chosenTags: [],
}

type initialStateType = typeof initialState


const photoReducer: any = (state: initialStateType = initialState, action: Reducers.PhotoReducer.IPhotoActions) => {
    switch (action.type) {
        case Reducers.PhotoReducer.GET_PHOTOS_SUCCESS:
            return { ...state, result: action.data }
        case Reducers.PhotoReducer.GET_PHOTOS_ERROR:
            return { ...state }
        case Reducers.AlbumsReducer.TURN_ON_UPDATE:
            return { ...state, isUpdate: true }
        case Reducers.AlbumsReducer.TURN_OFF_UPDATE:
            return { ...state, isUpdate: false }
        case Reducers.PhotoReducer.TURN_ON_FULL_MEDIA:
            return { ...state, fullMedia: { isShown: true, src: action.data } }
        case Reducers.PhotoReducer.TURN_OFF_FULL_MEDIA:
            return { ...state, fullMedia: { isShown: false, src: "" } }
        case Reducers.PhotoReducer.ADD_PHOTOS_SUCCESS:
            return { ...state }
        case Reducers.PhotoReducer.ADD_PHOTOS_ERROR:
            return { ...state }
        case Reducers.PhotoReducer.SET_SIMILAR_TAG:
            return { ...state, chosenTags: action.data }
    }
    return state
}


export const createTurnOnUpdate = (): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.PhotoReducer.TURN_ON_UPDATE }
}

export const createTurnOffUpdate = (): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.PhotoReducer.TURN_OFF_UPDATE }
}

export const createSetSimilarTags = (tags: string[]): Reducers.PhotoReducer.IPhotoActions => {
    return { type: Reducers.PhotoReducer.SET_SIMILAR_TAG, data: tags }
}

export const createGetPhotos = () => async (dispatch: Dispatch<Reducers.PhotoReducer.IPhotoActions>) => {
    const r = await getPhotos()
    if (r && r.ok && r.data) {
        dispatch(createGetPhotosSuccess(r.data))
    } else {
        dispatch(createGetPhotosError())
    }
    dispatch(createTurnOffUpdate())
}

const createGetPhotosSuccess = (d: any): Reducers.PhotoReducer.IPhotoActions => {
    return { type: Reducers.PhotoReducer.GET_PHOTOS_SUCCESS, data: d }
}

const createGetPhotosError = (): Reducers.PhotoReducer.IPhotoActions => {
    return { type: Reducers.PhotoReducer.GET_PHOTOS_ERROR }
}

export const createAddPhotos = (f: FileList) => async (dispatch: Dispatch<Reducers.PhotoReducer.IPhotoActions>) => {
    const r: SentData.LoadedMedia = []

    const v = Array.from(f)
    for (const i of v) {
        await new Promise(resolve => {
            const reader = new FileReader()
            reader.onloadend = () => {
                const f = reader.result?.toString()
                if (f) {
                    r.push({
                        file: f.split(",")[1],
                        name: i.name,
                        size: i.size,
                        extension: i.name.split(".").reverse()[0],
                    })
                }
                resolve(null)
            }
            reader.readAsDataURL(i)
        })
    }

    const ok = await addPhotos(r)
    if (ok) {
        dispatch(createAddPhotosSuccess())
    } else {
        dispatch(createAddPhotosError())
    }
    dispatch(createTurnOnUpdate())
}


const createAddPhotosSuccess = (): Reducers.PhotoReducer.IPhotoActions => {
    return { type: Reducers.PhotoReducer.ADD_PHOTOS_SUCCESS }
}

const createAddPhotosError = (): Reducers.PhotoReducer.IPhotoActions => {
    return { type: Reducers.PhotoReducer.ADD_PHOTOS_ERROR }
}

export const createTurnOnFullMedia = (thumbnail: string) => async (dispatch: Dispatch<Reducers.PhotoReducer.IPhotoActions>) => {
    const r = await getFullMedia("photos", thumbnail)
    if (r && r.ok) {
        dispatch(createTurnOnFullMediaSuccess(r.media))
    } else {
        dispatch(createTurnOnFullMediaError())
    }
}

const createTurnOnFullMediaSuccess = (media: string): Reducers.PhotoReducer.IPhotoActions => {
    return { type: Reducers.PhotoReducer.TURN_ON_FULL_MEDIA, data: media }
}

const createTurnOnFullMediaError = (): Reducers.PhotoReducer.IPhotoActions => {
    return { type: Reducers.PhotoReducer.TURN_OFF_FULL_MEDIA }
}

export const createTurnOffFullMedia = (): Reducers.PhotoReducer.IPhotoActions => {
    return { type: Reducers.PhotoReducer.TURN_OFF_FULL_MEDIA }
}

export default photoReducer