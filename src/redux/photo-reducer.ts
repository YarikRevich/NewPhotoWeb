import React, { Dispatch } from "react";
import { addPhotos, getPhotos } from "../api/photos";
import { GetTagCoincidence, GetSomeTagCoincidence } from "../Helpers/utils"
import { Reducers } from "../types";
import type { SentData } from "../types";
//Style constants ...

import classes from "./../constants/PhotoPage/Photos.module.css"

let initialState = {
    result: [],
    fullMedia: "",
    chosenTags: [],
}

type initialStateType = typeof initialState


const photoReducer: any = (state: initialStateType = initialState, action: Reducers.PhotoReducer.IPhotoActions) => {
    switch (action.type) {
        case Reducers.PhotoReducer.GET_PHOTOS_SUCCESS:
            return { ...state, result: action.data }
        case Reducers.PhotoReducer.GET_PHOTOS_ERROR:
            return { ...state }
        case Reducers.PhotoReducer.GET_FULL_PHOTO_SUCCESS:
            return { ...state, fullMedia: action.data }
        case Reducers.PhotoReducer.GET_FULL_PHOTO_ERROR:
            return { ...state }
        case Reducers.PhotoReducer.ADD_PHOTOS_SUCCESS:
            return { ...state }
        case Reducers.PhotoReducer.ADD_PHOTOS_ERROR:
            return { ...state }
        case Reducers.PhotoReducer.SET_CHOSEN_TAG:
            return { ...state, chosenTag: action.data }
        // case GET_PHOTO_FOR_DOWNLOAD:
        //     if (action.thumbnail === undefined) return
        //     fetch(`/spa/photos?full=${action.thumbnail}`, {
        //         headers: {
        //             "Full": action.thumbnail,
        //             "Fetch": "true",
        //         }
        //     })
        //         .then(resp => resp.json())
        //         .then(data => {
        //             state.detailedPhotoView.photo = data.result.photo;
        //         })

        //     let int = setInterval(() => {
        //         if (state.detailedPhotoView.photo.length != 0) {
        //             const ref = action.ref as React.RefObject<HTMLAnchorElement>
        //             const refc = ref.current
        //             if (refc === undefined || refc === null) return
        //             refc.href = `data:image/png;image/jpeg;image/jpg;base64, ${state.detailedPhotoView.photo}`;
        //             refc.click();
        //             state.detailedPhotoView.cleanPhoto();
        //             clearInterval(int);
        //         }
        //     }, 10)
        //     break
        // case SET_TAG_CHOSEN_UPDATER:
        //     let at = [];
        //     for (let r of state.result) {
        //         if (r.tags !== null) {
        //             at.push(...r.tags)
        //         }
        //     }
        //     if (action.tag === undefined) {
        //         return
        //     }
        //     let coincidedTag = GetTagCoincidence(at, action.tag);

        //     const ref = action.ref as HTMLInputElement
        //     if (action.ref === undefined) {
        //         return
        //     }
        //     ref.value = coincidedTag;

        //     if (coincidedTag !== "") {
        //         state.tagChoser.tagsToChose.push(coincidedTag)
        //     }
        //     if (action.updater) {
        //         action.updater()
        //     }
        //     break
        // case DELETE_CHOSEN_TAG:
        //     state.tagChoser.tagsToChose = []
        //     if (action.updater) {
        //         action.updater()
        //     }
        //     break
        // case GET_ALL_AVAILABLE_TAGS:
        //     let ata = [] as string[];
        //     for (let r of state.result) {
        //         if (r.tags) {
        //             for (let t of r.tags) {
        //             if (!ata.includes(t)) {
        //                 ata.push(t)
        //             }
        //         }
        //     }
        // }
        // if (action.tag === undefined) {
        //     return
        // }
        // let coincidedTags = GetSomeTagCoincidence(ata, action.tag);

        // const refs = action.refs
        // if (!refs) break

        // const inputRef = refs[0] as React.RefObject<HTMLInputElement>
        // const inputRefc = inputRef.current
        // if (!inputRefc) break

        // const buttonRef = refs[1] as React.RefObject<HTMLButtonElement>
        // const buttonRefc = buttonRef.current
        // if (!buttonRefc) break

        // const divRef = refs[2] as React.RefObject<HTMLDivElement>
        // const divRefc = divRef.current
        // if (!divRefc) break

        // divRefc.className = classes["photo-search-av-tags-tab"]

        // coincidedTags.forEach(el => {
        //     if (el.length != 0) {
        //         let nd = document.createElement("div")
        //         nd.className = classes["photo-search-av-tags-row-wrapper"]
        //         nd.onclick = () => {
        //             inputRefc.value = el
        //             buttonRefc.click()
        //             divRefc.style.display = "none"
        //         }
        //         let n = document.createElement("p")
        //         n.innerText = el
        //         n.className = classes["photo-search-av-tags-row"]
        //         nd.appendChild(n)

        //         divRefc.appendChild(nd)
        //     }
        // })
        // if (divRefc.children.length === 0) {
        //     divRefc.style.marginTop = "94px"
        //     let nd = document.createElement("div")
        //     nd.className = classes["photo-search-av-tags-row-wrapper"]
        //     let n = document.createElement("p")
        //     n.innerText = "It doesn't match"
        //     nd.appendChild(n)
        //     divRefc.appendChild(nd)
        // } else {
        //     divRefc.style.marginTop = `${(46 + (60 * divRefc.children.length))}px`
        // }
        // break
        // case BLUR_TAG_INPUT:
        //     const b = action.ref as React.RefObject<HTMLInputElement>
        //     const bc = b.current
        //     if (bc === null || bc === undefined) {
        //         return
        //     }
        //     if (!bc.matches(":hover")) {
        //         bc.style.display = "none"
        //     }
        //     break
        // case FOCUS_TAG_INPUT:
        //     const f = action.ref as React.RefObject<HTMLInputElement>
        //     const fc = f.current
        //     if (fc === null || fc === undefined) {
        //         return
        //     }
        //     fc.style.display = "flex"
        //     break
    }
    return state
}

export const createGetPhotos = () => async (dispatch: Dispatch<Reducers.PhotoReducer.IPhotoActions>) => {
    const r = await getPhotos()
    if (r && r.ok) {
        dispatch(createGetPhotosSuccess(r.data))
    } else {
        dispatch(createGetPhotosError())
    }
}

const createGetPhotosSuccess = (d: any): Reducers.PhotoReducer.IPhotoActions => {
    return { type: Reducers.PhotoReducer.GET_PHOTOS_SUCCESS, data: d }
}

const createGetPhotosError = (): Reducers.PhotoReducer.IPhotoActions => {
    return { type: Reducers.PhotoReducer.GET_PHOTOS_ERROR }
}

export const createAddPhotos = (f: FileList) => async (dispatch: Dispatch<Reducers.PhotoReducer.IPhotoActions>) => {
    const r: SentData.LoadedPhotos = []

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
}


const createAddPhotosSuccess = (): Reducers.PhotoReducer.IPhotoActions => {
    return { type: Reducers.PhotoReducer.ADD_PHOTOS_SUCCESS }
}

const createAddPhotosError = (): Reducers.PhotoReducer.IPhotoActions => {
    return { type: Reducers.PhotoReducer.ADD_PHOTOS_ERROR }
}

export const createSetChosenTag = (t: string): Reducers.PhotoReducer.IPhotoActions => {
    return { type: Reducers.PhotoReducer.SET_CHOSEN_TAG, data: t }
}

export default photoReducer