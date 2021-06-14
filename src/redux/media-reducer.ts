import React, { Dispatch } from "react";
import { addPhotos, getPhotos, addVideos, getVideos } from "../api/media";
import { Reducers } from "../types";
import type { SentData } from "../types";
import { getFullMedia } from "../api/media";

let initialState = {
    result: {
        photos: [],
        videos: [],
    },
    resultByTag: [],
    isUpdate: false,
    fullMedia: {
        isShown: false,
        src: "",
    },
    chosenTags: [],
}

type initialStateType = typeof initialState


const MediaReducer: any = (state: initialStateType = initialState, action: Reducers.MediaReducer.IMediaActions) => {
    switch (action.type) {
        case Reducers.MediaReducer.GET_MEDIA_SUCCESS:
            return { ...state, result: action.data }
        case Reducers.MediaReducer.GET_MEDIA_ERROR:
            return { ...state }
        case Reducers.MediaReducer.TURN_ON_UPDATE:
            return { ...state, isUpdate: true }
        case Reducers.MediaReducer.TURN_OFF_UPDATE:
            return { ...state, isUpdate: false }
        case Reducers.MediaReducer.TURN_ON_FULL_MEDIA:
            return { ...state, fullMedia: { isShown: true, src: action.data } }
        case Reducers.MediaReducer.TURN_OFF_FULL_MEDIA:
            return { ...state, fullMedia: { isShown: false, src: "" } }
        case Reducers.MediaReducer.ADD_MEDIA_SUCCESS:
            return { ...state }
        case Reducers.MediaReducer.ADD_MEDIA_ERROR:
            return { ...state }
        case Reducers.MediaReducer.SET_SIMILAR_TAG:
            return { ...state, chosenTags: action.data }
    }
    return state
}


export const createTurnOnUpdate = (): Reducers.MediaReducer.IMediaActions => {
    return { type: Reducers.MediaReducer.TURN_ON_UPDATE }
}

export const createTurnOffUpdate = (): Reducers.MediaReducer.IMediaActions => {
    return { type: Reducers.MediaReducer.TURN_OFF_UPDATE }
}

export const createSetSimilarTags = (tags: string[]): Reducers.MediaReducer.IMediaActions => {
    return { type: Reducers.MediaReducer.SET_SIMILAR_TAG, data: tags }
}

export const createGetMedia = (offset: number, page: number) => async (dispatch: Dispatch<Reducers.MediaReducer.IMediaActions>) => {
    const d = { photos: [], videos: [] }

    const p = await getPhotos(offset, page)
    if (p && p.ok && p.data) {
        d.photos = p.data
    } else {
        dispatch(createGetMediaError())
    }

    const v = await getVideos(offset, page)
    if (v && v.ok && v.data) {
        d.videos = v.data
    } else {
        dispatch(createGetMediaError())
    }
    dispatch(createGetMediaSuccess(d))
    dispatch(createTurnOffUpdate())
}

const createGetMediaSuccess = (d: any): Reducers.MediaReducer.IMediaActions => {
    return { type: Reducers.MediaReducer.GET_MEDIA_SUCCESS, data: d }
}

const createGetMediaError = (): Reducers.MediaReducer.IMediaActions => {
    return { type: Reducers.MediaReducer.GET_MEDIA_ERROR }
}

export const createAddMedia = (f: FileList) => async (dispatch: Dispatch<Reducers.MediaReducer.IMediaActions>) => {
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

    const r = await addPhotos(photos)
    if (r) {
        const r = await addVideos(videos)
        if (r) {
            dispatch(createAddMediaSuccess())
        }
    } else {
        dispatch(createAddMediaError())
    }
    dispatch(createTurnOnUpdate())
}


const createAddMediaSuccess = (): Reducers.MediaReducer.IMediaActions => {
    return { type: Reducers.MediaReducer.ADD_MEDIA_SUCCESS }
}

const createAddMediaError = (): Reducers.MediaReducer.IMediaActions => {
    return { type: Reducers.MediaReducer.ADD_MEDIA_ERROR }
}

export const createTurnOnFullMedia = (thumbnail: string, type: "photos" | "videos") => async (dispatch: Dispatch<Reducers.MediaReducer.IMediaActions>) => {
    const r = await getFullMedia(type, thumbnail)
    if (r && r.ok) {
        dispatch(createTurnOnFullMediaSuccess(r.media))
    } else {
        dispatch(createTurnOnFullMediaError())
    }
}

const createTurnOnFullMediaSuccess = (media: string): Reducers.MediaReducer.IMediaActions => {
    return { type: Reducers.MediaReducer.TURN_ON_FULL_MEDIA, data: media }
}

const createTurnOnFullMediaError = (): Reducers.MediaReducer.IMediaActions => {
    return { type: Reducers.MediaReducer.TURN_OFF_FULL_MEDIA }
}

export const createTurnOffFullMedia = (): Reducers.MediaReducer.IMediaActions => {
    return { type: Reducers.MediaReducer.TURN_OFF_FULL_MEDIA }
}

export default MediaReducer