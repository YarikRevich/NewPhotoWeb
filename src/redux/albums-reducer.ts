import React, { Dispatch } from "react";
import { getAlbums } from "../api/albums";
import { Reducers } from "../types";

const initialState = {
    result: [],
}

type initialStateType = typeof initialState

const albumsReducer = (state: initialStateType = initialState, action: Reducers.AlbumsReducer.IAlbumsActions) => {
    switch (action.type) {
        case Reducers.AlbumsReducer.GET_ALBUMS_SUCCESS:
            return { ...state, result: action.data }
        case Reducers.AlbumsReducer.GET_ALBUMS_ERROR:
            return { ...state }
        case Reducers.AlbumsReducer.CREATE_ALBUM_SUCCESS:
            return { ...state }
        case Reducers.AlbumsReducer.CREATE_ALBUM_ERROR:
            return { ...state }
        case Reducers.AlbumsReducer.DELETE_ALBUM_SUCCESS:
            return { ...state }
        case Reducers.AlbumsReducer.DELETE_ALBUM_ERROR:
            return { ...state }
        //     case ADD_TO_ALBUM:
        //         let filesOrFile = action.files as FileList;
        //         if (filesOrFile === null || filesOrFile === undefined) {
        //             return
        //         }

        //         let result = new Array<any>();

        //         let filesArray = Array.from(filesOrFile);

        //         for (let el of filesArray) {

        //             let reader = new FileReader();

        //             reader.onloadend = (f: ProgressEvent<FileReader>) => {

        //                 let fileBase64 = reader.result?.toString();
        //                 if (fileBase64 === undefined) {
        //                     return
        //                 }

        //                 result.push({
        //                     file: fileBase64.split("base64,")[1],
        //                     size: el.size,
        //                     extension: el.type.split("/")[1]
        //                 })

        //             }
        //             reader.readAsDataURL(el)
        //         }

        //         let interval = setInterval(() => {
        //             if (result.length === filesArray.length) {

        //                 const an = action.ref as React.RefObject<HTMLInputElement>;
        //                 const anc = an.current
        //                 if (!anc) return
        //                 const aname = anc.value

        //                 fetch("/spa/albums/add", {
        //                     method: "PUT",
        //                     headers: {
        //                         "Content-Type": "application/json",
        //                         "Fetch": "true",
        //                     },
        //                     body: JSON.stringify({ result: result, name: aname }),
        //                 })
        //                     .then(resp => resp.json())
        //                     .then((data) => { state.result = []; return data })
        //                     .then(data => {
        //                         let interval = setInterval(() => {
        //                             if (data.service.ok) {
        //                                 action.updater(false)
        //                                 clearInterval(interval)
        //                             }
        //                         }, 100)
        //                     })
        //                 clearInterval(interval);
        //             }
        //         }, 100);
        //         break
        // }
    }
    return state
}

export const createGetAlbums = () => async (dispatch: Dispatch<Reducers.AlbumsReducer.IAlbumsActions>) => {
    const r = await getAlbums()
    if (r && r.ok) {
        dispatch(createGetAlbumsSuccess(r.data))
    } else {
        dispatch(createGetAlbumsError())
    }
}

const createGetAlbumsSuccess = (d: any): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.AlbumsReducer.GET_ALBUMS_SUCCESS, data: d }
}

const createGetAlbumsError = (): Reducers.AlbumsReducer.IAlbumsActions => {
    return { type: Reducers.AlbumsReducer.GET_ALBUMS_ERROR }
}

export default albumsReducer